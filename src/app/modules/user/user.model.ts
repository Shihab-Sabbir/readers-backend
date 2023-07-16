import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';
import { BCRYPT_SALT_ROUNDS } from '../../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser, Record<string, unknown>, IUserMethods>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
      _id: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.isUserExists = async function (
  phoneNumber: string
): Promise<Partial<IUser> | null> {
  const isUserExist = User.findOne(
    { phoneNumber: phoneNumber },
    {
      phoneNumber: 1,
      password: 1,
    }
  ).lean();

  return isUserExist;
};

userSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  DbPassword: string
): Promise<boolean> {
  const isPasswordMatch: boolean = await bcrypt.compare(
    givenPassword,
    DbPassword
  );
  return isPasswordMatch;
};

userSchema.pre('save', async function (next) {
  //hash password just before save in DB
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(BCRYPT_SALT_ROUNDS));
  next();
});

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

const User = model<IUser, UserModel>('User', userSchema);

export default User;
