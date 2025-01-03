"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlLogger = exports.prismaLogger = exports.expressLogger = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const express_winston_1 = __importDefault(require("express-winston"));
const logPrefixer = (loggerType) => {
    return winston_1.default.format((info) => {
        info.message = `[${loggerType}] ${info.message}`;
        return info;
    })();
};
const loggerFormat = (loggerType) => {
    return winston_1.default.format.combine(winston_1.default.format.colorize(), logPrefixer(loggerType), winston_1.default.format.simple());
};
const loggerTransports = [
    new winston_1.default.transports.Console({
        level: "debug",
    }),
    new winston_1.default.transports.File({
        filename: "error.log",
        level: "error",
    }),
    new winston_1.default.transports.File({
        filename: "combined.log",
    }),
];
exports.logger = winston_1.default.createLogger({
    transports: loggerTransports,
    format: loggerFormat("console"),
});
exports.expressLogger = express_winston_1.default.logger({
    transports: loggerTransports,
    format: loggerFormat("Express"),
    meta: false,
    msg: "{{req.method}}: ({{res.statusCode}}) in {{res.responseTime}}ms: {{req.url}}",
});
exports.prismaLogger = winston_1.default.createLogger({
    transports: loggerTransports,
    format: loggerFormat("Prisma"),
});
exports.graphqlLogger = winston_1.default.createLogger({
    transports: loggerTransports,
    format: loggerFormat("GraphQL"),
});
//# sourceMappingURL=winstonLogger.js.map