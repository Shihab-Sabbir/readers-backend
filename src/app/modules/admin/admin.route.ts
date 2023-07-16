import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createAdminZodSchema } from './admin.validation';
import { AuthController } from '../auth/auth.controller';
import { AdminController } from './admin.controller';
const adminRoutes = express.Router();

adminRoutes.post(
  '/create-admin',
  validateRequest(createAdminZodSchema),
  AdminController.createAdmin
);
adminRoutes.post('/login', AdminController.loginAdmin);

export default adminRoutes;
