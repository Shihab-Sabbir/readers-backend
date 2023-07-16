import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export interface IReading {
  phoneNumber: string;
  status?: 'reading' | 'read soon' | 'finished';
}

export type IProduct = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  image?: string;
  addedBy: Types.ObjectId | IUser;
  wishedBy?: string[] | null;
  readList?: IReading[] | null;
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;

export type IProductSearch = {
  genre?: string;
  publicationDate?: string;
};

export type IProductFilters = {
  minPrice?: number;
  maxPrice?: number;
};
