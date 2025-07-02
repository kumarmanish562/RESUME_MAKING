import express from 'express';
import { registerUser } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// protect route as token will be required

userRouter.get('/profile', protect, getUserProfile);

export default userRouter;