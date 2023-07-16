import { Schema, model } from 'mongoose';
import { AdminModel, IAdmin, IAdminMethods } from './admin.interface';
import { BCRYPT_SALT_ROUNDS } from '../../../config';
import bcrypt from 'bcrypt';

const AdminSchema = new Schema<IAdmin, Record<string, unknown>, IAdminMethods>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['admin'],
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
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
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

AdminSchema.methods.isAdminExists = async function (
  phoneNumber: string
): Promise<Partial<IAdmin> | null> {
  const isAdminExist = Admin.findOne(
    { phoneNumber: phoneNumber },
    {
      phoneNumber: 1,
      password: 1,
      role: 1,
    }
  ).lean();

  return isAdminExist;
};

AdminSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(BCRYPT_SALT_ROUNDS));
  next();
});

AdminSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);
