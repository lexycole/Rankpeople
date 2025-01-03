"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const logger_1 = require("@repo/logger");
const client_1 = require("@prisma/client");
exports.prismaClient = new client_1.PrismaClient({
    log: [
        {
            level: "query",
            emit: "event",
        },
        {
            level: "info",
            emit: "event",
        },
        {
            level: "warn",
            emit: "event",
        },
        {
            level: "error",
            emit: "event",
        },
    ],
});
exports.prismaClient.$on("query", (e) => {
    logger_1.prismaLogger.debug(`Query: ${e.params} ${e.duration}ms`);
});
exports.prismaClient.$on("info", (e) => {
    logger_1.prismaLogger.info(`${e.message}`);
});
exports.prismaClient.$on("warn", (e) => {
    logger_1.prismaLogger.warn(`${e.message}`);
});
exports.prismaClient.$on("error", (e) => {
    logger_1.prismaLogger.error(`${e.message}`);
});
//# sourceMappingURL=core.js.map