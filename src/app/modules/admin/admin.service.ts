import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ILogin, ILoginResponse } from '../auth/auth.interface';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';
import { generateJWT_Token } from '../../../shared/jwt/generateJWT_Token';
import {
  JWT_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
  JWT_SECRET_KEY,
  JWT_SECRET_REFRESH_KEY,
} from '../../../config';
import { isPasswordMatched } from '../../../shared/utils/comparePassword';

const createAdmin = async (userInfo: IAdmin): Promise<IAdmin | null> => {
  const createdAdmin = await Admin.create(userInfo);
  return createdAdmin;
};

const loginAdmin = async (loginInfo: ILogin): Promise<ILoginResponse> => {
  const { phoneNumber, password } = loginInfo;

  const admin = new Admin();
  const dbAdmin = await admin.isAdminExists(phoneNumber);

  if (!dbAdmin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not Found !');
  }

  const savedPassword: string = dbAdmin?.password as string;

  const isPasswordMatch: boolean = await isPasswordMatched(
    password,
    savedPassword
  );

  if (!isPasswordMatch) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Phone number or password does not match !'
    );
  }

  //generate access token and refresh token
  const accessToken = generateJWT_Token(
    dbAdmin,
    JWT_SECRET_KEY as string,
    JWT_EXPIRES_IN as string
  );

  const refreshToken = generateJWT_Token(
    dbAdmin,
    JWT_SECRET_REFRESH_KEY as string,
    JWT_REFRESH_EXPIRES_IN as string
  );

  const result = {
    accessToken,
    refreshToken,
  };

  return result;
};

export const AdminService = {
  createAdmin,
  loginAdmin,
};
