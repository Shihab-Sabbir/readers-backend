"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const productRoutes = express_1.default.Router();
productRoutes.post('/', (0, auth_1.default)(), product_controller_1.ProductController.createProduct);
productRoutes.patch('/wish/:id', (0, auth_1.default)(), product_controller_1.ProductController.handleWishList);
productRoutes.patch('/read-list/:id', (0, auth_1.default)(), product_controller_1.ProductController.handleReadList);
productRoutes.patch('/review/:id', (0, auth_1.default)(), product_controller_1.ProductController.handleReview);
productRoutes.patch('/read-status/:id', (0, auth_1.default)(), product_controller_1.ProductController.handleReadStatus);
productRoutes.get('/', product_controller_1.ProductController.getProducts);
productRoutes.get('/:id', product_controller_1.ProductController.getSingleProduct);
productRoutes.patch('/:id', (0, auth_1.default)(), product_controller_1.ProductController.updateProduct);
productRoutes.delete('/:id', (0, auth_1.default)(), product_controller_1.ProductController.deleteProduct);
exports.default = productRoutes;
