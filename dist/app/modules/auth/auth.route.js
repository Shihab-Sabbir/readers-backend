"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const user_controller_1 = require("../user/user.controller");
const authRoutes = express_1.default.Router();
authRoutes.post('/signup', user_controller_1.UserController.createUser);
authRoutes.post('/login', (0, validateRequest_1.default)(auth_validation_1.loginZodSchema), auth_controller_1.AuthController.loginUser);
authRoutes.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.refreshTokenZodSchema), auth_controller_1.AuthController.UserRefreshToken);
exports.default = authRoutes;
