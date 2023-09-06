import express from 'express';
const router = express.Router();
import * as UserController from '../controllers/users';
import { registerUser, refreshToken } from '../controllers/users';



router.post('/', UserController.registerUser);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.post('/login', UserController.loginUser);
// router.post('/register', UserController.registerUser);
router.post('/refresh-token', UserController.refreshToken);



export default router;