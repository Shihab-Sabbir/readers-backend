"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const order_service_1 = require("./order.service");
const sendResponse_1 = __importDefault(require("../../../shared/utils/sendResponse"));
const createOrder = async (req, res, next) => {
    try {
        const order = req.body;
        const result = await order_service_1.OrderService.createOrder(order);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            data: result,
            message: 'Order created successfully !',
        });
    }
    catch (error) {
        next(error);
    }
};
const getSingleOrder = async (req, res, next) => {
    try {
        const requestedUser = req.user;
        const orderId = req.params.id;
        const result = await order_service_1.OrderService.getSingleOrder(requestedUser, orderId);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            data: result,
            message: 'Order fetched successfully !',
        });
    }
    catch (error) {
        next(error);
    }
};
const getOrders = async (req, res, next) => {
    try {
        const requestedUser = req.user;
        const result = await order_service_1.OrderService.getAllOrders(requestedUser);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            data: result,
            message: 'Order fetched successfully !',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.OrderController = {
    createOrder,
    getOrders,
    getSingleOrder,
};
