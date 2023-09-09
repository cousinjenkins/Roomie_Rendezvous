import express from 'express';
const router = express.Router();
import * as UserController from '../controllers/users';

// Registration and login
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

// Handling tokens
router.post('/refresh-token', UserController.refreshToken);

// CRUD operations
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
