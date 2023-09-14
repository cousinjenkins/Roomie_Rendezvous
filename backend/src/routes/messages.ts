import express from 'express';
import { sendMessage, getMessages } from '../controllers/messages';

const router = express.Router();

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';


const ACCESS_SECRET = process.env.ACCESS_SECRET || 'your_access_secret';

interface ExtendedRequest extends Request {
    user?: JwtPayload;
}

export const authenticateJWT = (req: ExtendedRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization;
    console.log("Received token:", token);
    if (!token) {
        res.status(401).json({ message: "No token provided." });
        return;
    }
    try {
        const tokenWithoutBearer = token.split(' ')[1];
        const decoded = jwt.verify(tokenWithoutBearer, ACCESS_SECRET) as JwtPayload;
        req.user = decoded;
        next();
    } catch (err) {
        if (err instanceof Error) { // Type check
            console.error("JWT Verification error:", err.message);
        } else {
            console.error("JWT Verification error:", err);
        }
        res.status(403).json({ message: "Invalid token." });
        return;
    }
};


router.post('/', authenticateJWT, sendMessage);
router.get('/', authenticateJWT, getMessages); 


export default router;
