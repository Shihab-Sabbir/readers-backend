import httpStatus from 'http-status';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AdminService } from './admin.service';
import sendResponse from '../../../shared/utils/sendResponse';
import { IAdmin } from './admin.interface';
import { ILogin, ILoginResponse } from '../auth/auth.interface';
import { NODE_ENV } from '../../../config';

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const info = req.body;
    const result = await AdminService.createAdmin(info);

    sendResponse<IAdmin>(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'Admin created successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const loginAdmin: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const payload: ILogin = req.body;
    const result = await AdminService.loginAdmin(payload);

    const { refreshToken, ...rest } = result; // not sent refresh token to frontend

    // set response token to cookie
    const cookieOptions = {
      secure: NODE_ENV === 'production', // true or false
      httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<ILoginResponse>(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: rest,
      message: 'Login successfully !',
    });
  } catch (error) {
    next(error);
  }
};

export const AdminController = {
  createAdmin,
  loginAdmin
};
