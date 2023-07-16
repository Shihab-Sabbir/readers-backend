import httpStatus from 'http-status';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { OrderService } from './order.service';
import sendResponse from '../../../shared/utils/sendResponse';
import { IOrder } from './order.interface';
import { JwtPayload } from 'jsonwebtoken';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = req.body;
    const result = await OrderService.createOrder(order);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'Order created successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const getSingleOrder: RequestHandler = async (req, res, next) => {
  try {
    const requestedUser: JwtPayload = req.user as JwtPayload;
    const orderId: string = req.params.id;
    const result = await OrderService.getSingleOrder(requestedUser, orderId);

    sendResponse<IOrder>(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'Order fetched successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const getOrders: RequestHandler = async (req, res, next) => {
  try {
    const requestedUser: JwtPayload = req.user as JwtPayload;
    const result = await OrderService.getAllOrders(requestedUser);

    sendResponse<IOrder[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'Order fetched successfully !',
    });
  } catch (error) {
    next(error);
  }
};

export const OrderController = {
  createOrder,
  getOrders,
  getSingleOrder,
};
