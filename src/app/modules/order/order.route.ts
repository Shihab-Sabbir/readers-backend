import express from 'express';
import { OrderController } from './order.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../shared/enums/user';
const orderRoutes = express.Router();

orderRoutes.post('/', auth(ENUM_USER_ROLE.BUYER), OrderController.createOrder);
orderRoutes.get(
  '/:id',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER),
  OrderController.getSingleOrder
);
orderRoutes.get(
  '/',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER),
  OrderController.getOrders
);

export default orderRoutes;
