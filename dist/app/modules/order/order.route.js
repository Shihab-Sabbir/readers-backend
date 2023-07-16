"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../shared/enums/user");
const orderRoutes = express_1.default.Router();
orderRoutes.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.BUYER), order_controller_1.OrderController.createOrder);
orderRoutes.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SELLER), order_controller_1.OrderController.getSingleOrder);
orderRoutes.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SELLER), order_controller_1.OrderController.getOrders);
exports.default = orderRoutes;
