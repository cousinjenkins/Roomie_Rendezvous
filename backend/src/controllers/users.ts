import * as UserModel from '../models/users'
import jwt from 'jsonwebtoken';


// last_login to be finished

const SECRET = 'your_secret_key';  // This should be in an environment variable or config file

export const registerUser = async (req: any, res: any) => {
    if (!req.body || !req.body.password) {
      return res.status(400).json({ message: "Password field is required." }) 
    }
    try {
      const existingUser = await UserModel.getUserByEmail(req.body.email);
      if (existingUser) {
        return res.status(409).json({ message: "Email already registered." });
      }
      
      console.log(req.body);
      console.log("Received data:", req.body);
      const user = await UserModel.createUser(req.body);
      const token = jwt.sign({ userId: user.user_id }, SECRET, { expiresIn: '1h' });
      res.status(201).json({ user, token });
    } catch (error) {
      console.error("Error in registerUser:", error);
      res.status(500).json({ message: "Error registering user." });
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
    const user = await UserModel.loginUser(req.body.username, req.body.password);
    if (user) {
      const token = jwt.sign({ userId: user.user_id }, SECRET, { expiresIn: '1h' });
      res.status(200).json({ user, token });
    } else {
      res.status(401).json({ message: "Invalid credentials." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in." });
  }
};