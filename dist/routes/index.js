"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("../app/modules/user/user.route"));
const product_route_1 = __importDefault(require("../app/modules/product/product.route"));
const auth_route_1 = __importDefault(require("../app/modules/auth/auth.route"));
const router = express_1.default.Router();
// shared routes
const defaultRoutes = [
    {
        path: '/users',
        route: user_route_1.default,
    },
    {
        path: '/auth',
        route: auth_route_1.default,
    },
    {
        path: '/products',
        route: product_route_1.default,
    },
];
defaultRoutes.forEach(route => {
    router.use(route.path, route.route);
});
exports.default = router;
