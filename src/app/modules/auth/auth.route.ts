import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { loginZodSchema, refreshTokenZodSchema } from './auth.validation';
import { UserController } from '../user/user.controller';
const authRoutes = express.Router();

authRoutes.post('/signup', UserController.createUser);
authRoutes.post(
  '/login',
  validateRequest(loginZodSchema),
  AuthController.loginUser
);
authRoutes.post(
  '/refresh-token',
  validateRequest(refreshTokenZodSchema),
  AuthController.UserRefreshToken
);

export default authRoutes;
