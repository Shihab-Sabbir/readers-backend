import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../errors/ApiError';

export const verifyJWT_Token = async (token: string, key: string) => {
  try {
    return jwt.verify(token, key) as JwtPayload;
  } catch (error: any) {
    throw new ApiError(httpStatus.NOT_FOUND, error);
  }
};
