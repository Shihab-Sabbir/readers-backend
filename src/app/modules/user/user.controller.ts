import httpStatus from 'http-status';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../../shared/utils/sendResponse';
import { IMyProfile, IUser } from './user.interface';
import { JwtPayload } from 'jsonwebtoken';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;
    const result = await UserService.createUser(user);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'User created successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserService.getAllUsers();

    sendResponse<IUser[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'User fetched successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const getSingleUser: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const result = await UserService.getSingleUser(id);

    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'User fetched successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const updatedData: Partial<IUser> = req.body;
    const result = await UserService.updateUser(id, updatedData);

    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'User updated successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const result = await UserService.deleteUser(id);

    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'User deleted successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const myProfile: RequestHandler = async (req, res, next) => {
  try {
    const requestedBy: JwtPayload = req.user as JwtPayload;
    const result = await UserService.myProfile(requestedBy);

    sendResponse<IMyProfile>(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'User profile fetched successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile: RequestHandler = async (req, res, next) => {
  try {
    const requestedBy: JwtPayload = req.user as JwtPayload;
    const updateData = req.body;
    const result = await UserService.updateProfile(requestedBy, updateData);

    sendResponse<IMyProfile>(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'Profile updated successfully !',
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  myProfile,
  updateProfile,
};
