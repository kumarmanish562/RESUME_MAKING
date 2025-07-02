import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);

// protect route as token will be required
userRoutes.get('/profile', protect, getUserProfile);

export default userRoutes;