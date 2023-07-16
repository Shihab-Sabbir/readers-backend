import { Model } from 'mongoose';

export type IName = {
  firstName: string;
  lastName: string;
};

export type IAdmin = {
  phoneNumber: string;
  role: 'admin';
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
};

export interface IAdminMethods {
  isAdminExists(phoneNumber: string): Promise<Partial<IAdmin> | null>;
  isPasswordMatched(
    givenPassword: string,
    DbPassword: string
  ): Promise<boolean>;
}

export type AdminModel = Model<IAdmin, Record<string, unknown>, IAdminMethods>;
