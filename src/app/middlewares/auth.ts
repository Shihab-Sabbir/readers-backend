import { RequestHandler } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { JWT_SECRET_KEY } from '../../config';
import { JwtPayload } from 'jsonwebtoken';
import { verifyJWT_Token } from '../../shared/jwt/verifyJWT_Token';

const auth =
  (...acceptedRoles: string[]): RequestHandler =>
  async (req, res, next) => {
    try {
      const token: string | undefined = req.headers.authorization as string;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'No token !');
      }
      const verifiedUser: JwtPayload | null = await verifyJWT_Token(
        token,
        JWT_SECRET_KEY as string
      );

      if (!verifiedUser) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Not authorized!');
      }
      
      req.user = verifiedUser as JwtPayload;

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
