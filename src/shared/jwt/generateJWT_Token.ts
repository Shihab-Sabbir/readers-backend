import jwt from 'jsonwebtoken';
import { IUser } from '../../app/modules/user/user.interface';

export const generateJWT_Token = (
  dbUser: any,
  secret_key: string,
  expire_time: string
) => {
  const token = jwt.sign(
    {
      _id: dbUser?._id,
      phoneNumber: dbUser?.phoneNumber,
    },
    secret_key,
    {
      expiresIn: expire_time,
    }
  );
  return token;
};
