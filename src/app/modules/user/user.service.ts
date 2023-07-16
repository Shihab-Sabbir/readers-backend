import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IMyProfile, IUser } from './user.interface';
import User from './user.model';
import { JwtPayload } from 'jsonwebtoken';
import { IName } from '../admin/admin.interface';

const createUser = async (userInfo: IUser): Promise<IUser | null> => {
  const { role } = userInfo;
  const createdUser = await User.create(userInfo);
  return createdUser;
};

const getAllUsers = async (): Promise<IUser[] | []> => {
  const users: IUser[] | [] = await User.find();
  return users;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const semester = await User.findById(id);
  return semester;
};

const updateUser = async (
  id: string,
  updatedData: Partial<IUser>
): Promise<IUser | null> => {
  const { role } = updatedData;

  if (role === 'seller') {
    updatedData.budget = 0;
  } else {
    updatedData.income = 0;
  }

  const updatedUser = await User.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser?._id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  return updatedUser;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const deletedUser = await User.findByIdAndDelete({
    _id: id,
  });
  return deletedUser;
};

const myProfile = async (
  requestedBy: JwtPayload
): Promise<IMyProfile | null> => {
  const { _id } = requestedBy;
  const user = await User.findById(_id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }
  const updatedUser: IMyProfile = {
    phoneNumber: user?.phoneNumber as string,
    name: {
      firstName: user?.name?.firstName as string,
      lastName: user?.name?.lastName as string,
    },
  };

  return updatedUser;
};

const updateProfile = async (
  requestedBy: JwtPayload,
  updateData: Partial<IUser>
): Promise<IMyProfile | null> => {
  const { _id } = requestedBy;

  const { name, ...rest } = updateData;
  const updateAdminInfo: Partial<IUser> = { ...rest };

  if (name && Object.keys(name as IName).length > 0) {
    Object.keys(name as IName).forEach((key: string) => {
      const nameKey = `name.${key}`;
      (updateAdminInfo as any)[nameKey] = name[key as keyof IName];
    });
  }

  const user = await User.findByIdAndUpdate(_id, updateData, {
    new: true,
    runValidators: true,
  });

  const updatedUser: IMyProfile = {
    phoneNumber: user?.phoneNumber as string,
    name: {
      firstName: user?.name?.firstName as string,
      lastName: user?.name?.lastName as string,
    },
  };

  return updatedUser;
};

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  myProfile,
  updateProfile,
};
