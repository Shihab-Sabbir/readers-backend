"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_validation_1 = require("./admin.validation");
const admin_controller_1 = require("./admin.controller");
const adminRoutes = express_1.default.Router();
adminRoutes.post('/create-admin', (0, validateRequest_1.default)(admin_validation_1.createAdminZodSchema), admin_controller_1.AdminController.createAdmin);
adminRoutes.post('/login', admin_controller_1.AdminController.loginAdmin);
exports.default = adminRoutes;
