"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const serverExitHandler_1 = require("./errors/serverExitHandler");
// this is for sync udefined/null value error handler , so it is at top !
// this type of error can be deected by global error handler also.
process.on('uncaughtException', err => {
    console.error(err);
    process.exit(1);
});
let server;
async function connectDb() {
    try {
        await mongoose_1.default.connect(`${config_1.DB_URL}`);
        console.log('Database connection established !');
        server = app_1.default.listen(config_1.PORT, () => {
            console.log(`App is listening on port ${config_1.PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to connect to the database', error);
        process.exit(1);
    }
}
// async error handler
// this type of error can not be deected by global error handler.
process.on('unhandledRejection', error => {
    (0, serverExitHandler_1.serverExitHandler)(server, error);
});
connectDb();
//signal termination handler
//server will be closed if specific signal is received by process manager on emergency.
process.on('SIGTERM', () => {
    if (server) {
        console.log('SIGTERM is received');
        server.close();
    }
});
