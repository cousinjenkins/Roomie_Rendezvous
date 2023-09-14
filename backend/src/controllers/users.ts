import * as UserModel from '../models/users';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken'; 

const ACCESS_SECRET = process.env.ACCESS_SECRET || 'your_access_secret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'your_refresh_secret';

export const registerUser = async (req: any, res: any) => {
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    const existingUser = await UserModel.getUserByEmail(req.body.email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const user = await UserModel.createUser(req.body);
    const accessToken = jwt.sign({ userId: user.user_id }, ACCESS_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user.user_id }, REFRESH_SECRET, { expiresIn: '30d' });

    await UserModel.storeRefreshToken(user.user_id, refreshToken);

    const userResponse = {
      id: user.user_id,
      name: user.username,
      isAdmin: user.is_admin
    };

    res.status(201).json({ user: userResponse, accessToken, refreshToken });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Error registering user." });
  }
};

export const refreshToken = async (req: any, res: any) => {
  const token = req.body.token;

  if (!token) {
    return res.status(403).json({ message: "No token provided." });
  }

  let payload: JwtPayload | string;

  try {
    payload = jwt.verify(token, REFRESH_SECRET) as JwtPayload;

    if (typeof payload === 'string' || !payload.userId) {
      return res.status(400).json({ message: "Invalid refresh token." });
    }

    const storedToken = await UserModel.getRefreshTokenForUser(payload.userId);

    if (!storedToken || storedToken !== token) {
      return res.status(401).json({ message: "Token does not match." });
    }

    const newAccessToken = jwt.sign({ userId: payload.userId }, ACCESS_SECRET, { expiresIn: '1h' });
    return res.json({ accessToken: newAccessToken });

  } catch (err) {
    return res.status(401).json({ message: "Token verification failed." });
  }
};

export const getUserById = async (req: any, res: any) => {
  try {
    const user = await UserModel.getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user." });
  }
};

export const updateUser = async (req: any, res: any) => {
  try {
    const user = await UserModel.updateUser(req.params.id, req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating user." });
  }
};

export const markProfileAsComplete = async (req: any, res: any) => {
  try {
    const user = await UserModel.updateUser(req.params.id, { isProfileComplete: true });
    if (user) {
      res.status(200).json({ message: "Profile marked as complete." });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating profile status." });
  }
};


export const deleteUser = async (req: any, res: any) => {
  try {
    await UserModel.deleteUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting user." });
  }
};

export const loginUser = async (req: any, res: any) => {
  try {
    const user = await UserModel.loginUser(req.body.email, req.body.password);

    console.log({user})

    if (user) {
      const accessToken = jwt.sign({ userId: user.user_id }, ACCESS_SECRET, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ userId: user.user_id }, REFRESH_SECRET, { expiresIn: '7d' });
      
      await UserModel.storeRefreshToken(user.user_id, refreshToken);

      // Fetch isProfileComplete status
      const isProfileComplete = await UserModel.isUserProfileComplete(user.user_id);

      const userResponse = {
        id: user.user_id,
        name: user.username,
        isAdmin: user.is_admin,
        isProfileComplete: isProfileComplete // Add this line
      };
      console.log("LIAN KAI testing loginUser function " + userResponse)

      res.status(200).json({ token: accessToken, user: userResponse });
    } else {
      res.status(401).json({ message: "Invalid credentials." });
    }

  } catch (error) {
    res.status(500).json({ message: "Error logging in." });
  }
};


