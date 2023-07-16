import { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import User from '../user/user.model';
import { ILogin, ILoginResponse, IRefreshToken } from './auth.interface';
import {
  JWT_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
  JWT_SECRET_KEY,
  JWT_SECRET_REFRESH_KEY,
} from '../../../config';
import { generateJWT_Token } from '../../../shared/jwt/generateJWT_Token';
import { verifyJWT_Token } from '../../../shared/jwt/verifyJWT_Token';

const loginUser = async (loginInfo: ILogin): Promise<ILoginResponse> => {
  const { phoneNumber, password } = loginInfo;
  const user = new User(); // create instance of User

  const dbUser = await user.isUserExists(phoneNumber);

  if (!dbUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not Found !');
  }

  const savedPassword: string = dbUser?.password as string;

  const isPasswordMatch: boolean = await user.isPasswordMatched(
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
    dbUser,
    JWT_SECRET_KEY as string,
    JWT_EXPIRES_IN as string
  );

  const refreshToken = generateJWT_Token(
    dbUser,
    JWT_SECRET_REFRESH_KEY as string,
    JWT_REFRESH_EXPIRES_IN as string
  );

  const result = {
    accessToken,
    refreshToken,
    phoneNumber,
  };

  return result;
};

const UserRefreshToken = async (
  refreshToken: string
): Promise<IRefreshToken> => {
  if (!refreshToken) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No refresh token available');
  }

  const verifiedRefreshToken: JwtPayload | null =
    (await verifyJWT_Token(refreshToken, JWT_SECRET_REFRESH_KEY as string)) ||
    null;

  if (!verifiedRefreshToken) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid refresh token!');
  }

  const { id } = verifiedRefreshToken as JwtPayload;

  // Check if the user is deleted/blocked or not in the database
  const dbUser = await User.findOne({ id });

  if (!dbUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  // Generate a new token
  const newAccessToken = generateJWT_Token(
    dbUser,
    JWT_SECRET_KEY as string,
    JWT_EXPIRES_IN as string
  );

  const result: IRefreshToken = {
    accessToken: newAccessToken,
  };

  return result;
};

export const AuthService = {
  loginUser,
  UserRefreshToken,
};
