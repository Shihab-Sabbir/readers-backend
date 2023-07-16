import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export interface IReading {
  phoneNumber: string;
  status?: 'reading' | 'read soon' | 'finished';
}

export interface IReview {
  name: string;
  date: string;
  body: string;
}

export type IProduct = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  publicationYear?: string;
  image?: string;
  addedBy: Types.ObjectId | IUser;
  wishedBy?: string[] | null;
  readList?: IReading[] | null;
  review?: IReview[] | null;
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;

export type IProductSearch = {
  title?: string;
  author?: string;
  genre?: string;
};

export type IProductFilters = {
  genre?: string;
  publicationYear?: string;
};
