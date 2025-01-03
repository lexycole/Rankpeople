"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRONTEND_URL = exports.BACKEND_URL = exports.DOCKER_ENV = exports.ON_SERVER = exports.REDIS_HOST = exports.COOKIE_SECRET = exports.COOKIE_NAME = exports.PACKAGE_VERSION = exports.__prod__ = exports.BUILD_MODE = void 0;
const isDocker_1 = require("./isDocker");
const onServer_1 = require("./onServer");
exports.BUILD_MODE = (process.env.NODE_ENV || "development");
exports.__prod__ = exports.BUILD_MODE === "production";
exports.PACKAGE_VERSION = process.env.npm_package_version;
exports.COOKIE_NAME = process.env.COOKIE_NAME || "name";
exports.COOKIE_SECRET = process.env.COOKIE_SECRET || "secret";
exports.REDIS_HOST = process.env.REDIS_HOST || "redis://redis:6379";
exports.ON_SERVER = (0, onServer_1.OnServer)();
exports.DOCKER_ENV = (0, isDocker_1.isDocker)();
exports.BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000/api";
exports.FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
//# sourceMappingURL=constants.js.map