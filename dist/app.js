"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./routes"));
const handleNoRouteFound_1 = require("./errors/handleNoRouteFound");
const cookieParser = require("cookie-parser");
const app = (0, express_1.default)();
app.use(cookieParser());
app.use((0, cors_1.default)());
//parser
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Readers Server Running !');
});
//routes
app.use('/api/v1', routes_1.default);
// Test route
app.get('/test', async (req, res, next) => { });
// Global error handler
app.use(globalErrorHandler_1.default);
//handle no route found error
app.use(handleNoRouteFound_1.handleNoRouteFound);
exports.default = app;
