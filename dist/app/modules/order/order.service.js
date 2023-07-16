"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const order_model_1 = __importDefault(require("./order.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = __importDefault(require("../product/product.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const user_1 = require("../../../shared/enums/user");
const createOrder = async (orderInfo) => {
    const { cow, buyer } = orderInfo;
    const targetedCow = await product_model_1.default.findById(cow);
    const targetedBuyer = await user_model_1.default.findById(buyer);
    if (!(targetedCow === null || targetedCow === void 0 ? void 0 : targetedCow._id)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Cow not found!');
    }
    if ((targetedCow === null || targetedCow === void 0 ? void 0 : targetedCow.label) === 'sold out') {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Cow already sold out !');
    }
    if (!(targetedBuyer === null || targetedBuyer === void 0 ? void 0 : targetedBuyer._id)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Buyer not found!');
    }
    if ((targetedBuyer === null || targetedBuyer === void 0 ? void 0 : targetedBuyer.role) !== 'buyer') {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User is not a buyer !');
    }
    const budget = (targetedBuyer === null || targetedBuyer === void 0 ? void 0 : targetedBuyer.budget) || 0;
    if (budget < targetedCow.price) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Budget is insufficient!');
    }
    const session = await mongoose_1.default.startSession();
    let createdOrder = null;
    try {
        session.startTransaction();
        // Update cow label to 'sold out'
        const updateCowLabel = await product_model_1.default.findOneAndUpdate({ _id: cow }, { $set: { label: 'sold out' } }, { session });
        if (!updateCowLabel) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update cow status!');
        }
        // Reduce buyer budget by the cow price
        const updateBuyerBudget = await user_model_1.default.findOneAndUpdate({ _id: buyer }, { $inc: { budget: -targetedCow.price } }, { session });
        if (!updateBuyerBudget) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update buyer budget!');
        }
        const sellerId = targetedCow.seller;
        const updateSellerIncome = await user_model_1.default.findOneAndUpdate({ _id: sellerId }, { $inc: { income: targetedCow.price } }, { session });
        if (!updateSellerIncome) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update seller income!');
        }
        // Create new order
        const newOrder = await order_model_1.default.create([orderInfo], { session });
        if (!newOrder.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create order!');
        }
        createdOrder = newOrder[0];
        await session.commitTransaction();
        await session.endSession();
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new ApiError_1.default(400, 'Failed to create!');
    }
    if (createdOrder) {
        createdOrder = await order_model_1.default.findOne({
            _id: createdOrder._id,
        })
            .populate({
            path: 'buyer',
            model: 'User',
        })
            .populate({
            path: 'cow',
            populate: {
                path: 'seller',
                model: 'User',
            },
            model: 'Cow',
        });
    }
    return createdOrder;
};
const getAllOrders = async (requestedUser) => {
    const allOrders = await order_model_1.default.find()
        .populate({
        path: 'buyer',
        model: 'User',
    })
        .populate({
        path: 'cow',
        populate: {
            path: 'seller',
            model: 'User',
        },
        model: 'Cow',
    });
    let orders = [];
    const { role, _id } = requestedUser;
    if (role === user_1.ENUM_USER_ROLE.ADMIN) {
        orders = [...allOrders];
    }
    if (role === user_1.ENUM_USER_ROLE.BUYER) {
        orders = allOrders.filter((order) => { var _a; return ((_a = order.buyer) === null || _a === void 0 ? void 0 : _a._id.toString()) === _id; });
    }
    if (role === user_1.ENUM_USER_ROLE.SELLER) {
        orders = allOrders.filter((order) => { var _a, _b; return ((_b = (_a = order.cow) === null || _a === void 0 ? void 0 : _a.seller) === null || _b === void 0 ? void 0 : _b._id.toString()) === _id; });
    }
    return orders;
};
const getSingleOrder = async (requestedUser, orderId) => {
    var _a, _b;
    const { role, _id } = requestedUser;
    const order = await order_model_1.default.findById(orderId)
        .populate({
        path: 'buyer',
        model: 'User',
    })
        .populate({
        path: 'cow',
        populate: {
            path: 'seller',
            model: 'User',
        },
        model: 'Cow',
    });
    if (!order) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Order not found');
    }
    if (role === user_1.ENUM_USER_ROLE.BUYER) {
        const buyer = order === null || order === void 0 ? void 0 : order.buyer;
        if (!buyer || ((_a = buyer._id) === null || _a === void 0 ? void 0 : _a.toString()) !== _id) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized access');
        }
    }
    if (role === user_1.ENUM_USER_ROLE.SELLER) {
        const cow = order.cow;
        const seller = cow === null || cow === void 0 ? void 0 : cow.seller;
        if (!seller || ((_b = seller === null || seller === void 0 ? void 0 : seller._id) === null || _b === void 0 ? void 0 : _b.toString()) !== _id) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized access');
        }
    }
    return order;
};
exports.OrderService = {
    createOrder,
    getAllOrders,
    getSingleOrder,
};
