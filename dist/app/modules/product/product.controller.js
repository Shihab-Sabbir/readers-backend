"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const product_service_1 = require("./product.service");
const sendResponse_1 = __importDefault(require("../../../shared/utils/sendResponse"));
const product_constant_1 = require("./product.constant");
const getSearchAndPaginationOptions_1 = require("../../../shared/utils/searchAndPagination/getSearchAndPaginationOptions");
const createProduct = async (req, res, next) => {
    try {
        const productInfo = req.body;
        const requestedUser = req.user;
        const result = await product_service_1.ProductService.createProduct(productInfo, requestedUser);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            data: result,
            message: 'Product created successfully !',
        });
    }
    catch (error) {
        next(error);
    }
};
const getProducts = async (req, res, next) => {
    try {
        const searchFilterAndPaginationOptions = (0, getSearchAndPaginationOptions_1.getSearchAndPaginationOptions)(req.query, product_constant_1.productFilterFields, product_constant_1.productSearchFields);
        const result = await product_service_1.ProductService.getProducts(searchFilterAndPaginationOptions);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            meta: result.meta,
            data: result.data,
            message: 'Products fetched successfully !',
        });
    }
    catch (error) {
        next(error);
    }
};
const getSingleProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await product_service_1.ProductService.getSingleProduct(id);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            data: result,
            message: 'Product fetched successfully !',
        });
    }
    catch (error) {
        next(error);
    }
};
const handleReview = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userInfo = req.user;
        const review = req.body.review;
        const result = await product_service_1.ProductService.handleReview(id, userInfo, review);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            data: result,
            message: 'Product updated successfully !',
        });
    }
    catch (error) {
        next(error);
    }
};
const handleWishList = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userInfo = req.user;
        const result = await product_service_1.ProductService.handleWishList(id, userInfo);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            data: result,
            message: 'Product updated successfully !',
        });
    }
    catch (error) {
        next(error);
    }
};
const handleReadList = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userInfo = req.user;
        const result = await product_service_1.ProductService.handleReadList(id, userInfo);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            data: result,
            message: 'Product updated successfully !',
        });
    }
    catch (error) {
        next(error);
    }
};
const handleReadStatus = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userInfo = req.user;
        const status = req.body.status;
        const result = await product_service_1.ProductService.handleReadStatus(id, userInfo, status);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            data: result,
            message: 'Product updated successfully !',
        });
    }
    catch (error) {
        next(error);
    }
};
const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const result = await product_service_1.ProductService.updateProduct(id, updatedData);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            data: result,
            message: 'Product updated successfully !',
        });
    }
    catch (error) {
        next(error);
    }
};
const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await product_service_1.ProductService.deleteProduct(id);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            data: result,
            message: 'Product deleted successfully !',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.ProductController = {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    handleWishList,
    handleReadList,
    handleReadStatus,
    handleReview,
};
