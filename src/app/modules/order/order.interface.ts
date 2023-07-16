import { Model, Types } from 'mongoose';
import { ICow } from '../product/product.interface';
import { IUser } from '../user/user.interface';

export type IOrder = {
  cow: Types.ObjectId | ICow;
  buyer: Types.ObjectId | IUser;
};

export type OrderModel = Model<IOrder, Record<string, unknown>>;
// here Record<string, unknown> is the replacement of {}.
// here OrderModel is used if any future methods are added to this model. withour methods this type OrderModel is not required. only Iuser in enough.
