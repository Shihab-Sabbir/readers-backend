import { Model } from 'mongoose';

export type IUser = {
  phoneNumber: string;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
};

export type IMyProfile = {
  phoneNumber: string;
  name: {
    firstName: string;
    lastName: string;
  };
};

export interface IUserMethods {
  isUserExists(phoneNumber: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    DbPassword: string
  ): Promise<boolean>;
}

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
