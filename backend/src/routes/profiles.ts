import express from 'express';
import jwt from 'jsonwebtoken';
import { getProfile, addProfile, updateExistingProfile, removeProfile, getAllProfiles, getCurrentProfile } from '../controllers/profiles';
import { config } from 'dotenv';
import { Request, Response, NextFunction } from 'express';
config()

const router = express.Router();

const ACCESS_SECRET = process.env.ACCESS_SECRET!;

function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, ACCESS_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden

        console.log("Decoded User:", user);

        (req as any).user = user;
        next();
    });
}

// Apply the verifyToken middleware to the desired routes
router.get('/current-profile', verifyToken, getCurrentProfile);
router.get('/profiles', verifyToken, getAllProfiles);
router.get('/:id', verifyToken, getProfile);
router.post('/', verifyToken, addProfile);

router.put('/:id', verifyToken, updateExistingProfile);
router.delete('/:id', verifyToken, removeProfile);
export default router;

