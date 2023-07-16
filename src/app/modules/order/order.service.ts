import { Admin } from './../admin/admin.model';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IOrder } from './order.interface';
import Order from './order.model';
import mongoose from 'mongoose';
import Cow from '../product/product.model';
import User from '../user/user.model';
import { JwtPayload } from 'jsonwebtoken';
import { ENUM_USER_ROLE } from '../../../shared/enums/user';
import { ICow } from '../product/product.interface';
import { IUser } from '../user/user.interface';

const createOrder = async (orderInfo: IOrder): Promise<IOrder | null> => {
  const { cow, buyer } = orderInfo;

  const targetedCow = await Cow.findById(cow);
  const targetedBuyer = await User.findById(buyer);

  if (!targetedCow?._id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cow not found!');
  }

  if (targetedCow?.label === 'sold out') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cow already sold out !');
  }

  if (!targetedBuyer?._id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Buyer not found!');
  }

  if (targetedBuyer?.role !== 'buyer') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User is not a buyer !');
  }

  const budget = targetedBuyer?.budget || 0;

  if (budget < targetedCow.price) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Budget is insufficient!');
  }

  const session = await mongoose.startSession();

  let createdOrder = null;

  try {
    session.startTransaction();

    // Update cow label to 'sold out'
    const updateCowLabel = await Cow.findOneAndUpdate(
      { _id: cow },
      { $set: { label: 'sold out' } },
      { session }
    );

    if (!updateCowLabel) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to update cow status!'
      );
    }

    // Reduce buyer budget by the cow price
    const updateBuyerBudget = await User.findOneAndUpdate(
      { _id: buyer },
      { $inc: { budget: -targetedCow.price } },
      { session }
    );

    if (!updateBuyerBudget) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to update buyer budget!'
      );
    }

    const sellerId = targetedCow.seller;

    const updateSellerIncome = await User.findOneAndUpdate(
      { _id: sellerId },
      { $inc: { income: targetedCow.price } },
      { session }
    );

    if (!updateSellerIncome) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to update seller income!'
      );
    }

    // Create new order
    const newOrder = await Order.create([orderInfo], { session });

    if (!newOrder.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create order!');
    }

    createdOrder = newOrder[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new ApiError(400, 'Failed to create!');
  }

  if (createdOrder) {
    createdOrder = await Order.findOne({
      _id: createdOrder._id,
    })
      .populate({
        path: 'buyer',
        model: 'User',
      })
      .populate({
        path: 'cow',
        populate: {
          path: 'seller',
          model: 'User',
        },
        model: 'Cow',
      });
  }

  return createdOrder;
};

const getAllOrders = async (
  requestedUser: JwtPayload
): Promise<IOrder[] | []> => {
  const allOrders: IOrder[] | [] = await Order.find()
    .populate({
      path: 'buyer',
      model: 'User',
    })
    .populate({
      path: 'cow',
      populate: {
        path: 'seller',
        model: 'User',
      },
      model: 'Cow',
    });

  let orders: IOrder[] | [] = [];

  const { role, _id } = requestedUser;

  if (role === ENUM_USER_ROLE.ADMIN) {
    orders = [...allOrders];
  }

  if (role === ENUM_USER_ROLE.BUYER) {
    orders = allOrders.filter(
      (order: any) => order.buyer?._id.toString() === _id
    );
  }

  if (role === ENUM_USER_ROLE.SELLER) {
    orders = allOrders.filter(
      (order: any) => order.cow?.seller?._id.toString() === _id
    );
  }

  return orders;
};

const getSingleOrder = async (
  requestedUser: JwtPayload,
  orderId: string
): Promise<IOrder | null> => {
  const { role, _id } = requestedUser;

  const order = await Order.findById(orderId)
    .populate({
      path: 'buyer',
      model: 'User',
    })
    .populate({
      path: 'cow',
      populate: {
        path: 'seller',
        model: 'User',
      },
      model: 'Cow',
    });

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }

  if (role === ENUM_USER_ROLE.BUYER) {
    const buyer = order?.buyer as IUser & { _id: string };
    if (!buyer || buyer._id?.toString() !== _id) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
    }
  }

  if (role === ENUM_USER_ROLE.SELLER) {
    const cow = order.cow as ICow;
    const seller = cow?.seller as IUser & { _id: string };
    if (!seller || seller?._id?.toString() !== _id) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
    }
  }

  return order;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
