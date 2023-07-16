import httpStatus from 'http-status';
import { RequestHandler } from 'express';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/utils/sendResponse';
import { ILogin, ILoginResponse, IRefreshToken } from './auth.interface';
import { NODE_ENV } from '../../../config';

const loginUser: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const payload: ILogin = req.body;
    const result = await AuthService.loginUser(payload);

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

const UserRefreshToken: RequestHandler = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const result = (await AuthService.UserRefreshToken(
      refreshToken
    )) as IRefreshToken;

    sendResponse<IRefreshToken>(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'Login successfully !',
    });
  } catch (err) {
    next(err);
  }
};

export const AuthController = {
  loginUser,
  UserRefreshToken,
};
