import dotenv from 'dotenv';
import path from 'path';

const result = dotenv.config({ path: path.join(process.cwd(), '.env') });

if (result.error) {
  throw result.error;
}

export const {
  PORT,
  DB_URL,
  NODE_ENV,
  JWT_SECRET_KEY,
  JWT_SECRET_REFRESH_KEY,
  JWT_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
  BCRYPT_SALT_ROUNDS,
} = process.env;
