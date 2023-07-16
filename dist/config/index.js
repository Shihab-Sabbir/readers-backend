"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BCRYPT_SALT_ROUNDS = exports.JWT_REFRESH_EXPIRES_IN = exports.JWT_EXPIRES_IN = exports.JWT_SECRET_REFRESH_KEY = exports.JWT_SECRET_KEY = exports.NODE_ENV = exports.DB_URL = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const result = dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
if (result.error) {
    throw result.error;
}
_a = process.env, exports.PORT = _a.PORT, exports.DB_URL = _a.DB_URL, exports.NODE_ENV = _a.NODE_ENV, exports.JWT_SECRET_KEY = _a.JWT_SECRET_KEY, exports.JWT_SECRET_REFRESH_KEY = _a.JWT_SECRET_REFRESH_KEY, exports.JWT_EXPIRES_IN = _a.JWT_EXPIRES_IN, exports.JWT_REFRESH_EXPIRES_IN = _a.JWT_REFRESH_EXPIRES_IN, exports.BCRYPT_SALT_ROUNDS = _a.BCRYPT_SALT_ROUNDS;
