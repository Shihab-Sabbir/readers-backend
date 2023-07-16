import { ENUM_USER_ROLE } from './../../../shared/enums/user';
import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
const userRoutes = express.Router();

userRoutes.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);
userRoutes.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  UserController.myProfile
);
userRoutes.patch(
  '/my-profile',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  UserController.updateProfile
);
userRoutes.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.getSingleUser
);
userRoutes.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.updateUser);
userRoutes.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteUser
);

export default userRoutes;
