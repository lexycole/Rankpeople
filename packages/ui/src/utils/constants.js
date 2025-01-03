"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URQL_BACKEND_URL = void 0;
const environment_1 = require("@repo/environment");
const getUrqlBackendUrl = () => {
    if (environment_1.ON_SERVER) {
        if (environment_1.DOCKER_ENV) {
            return "http://app:4000/api";
        }
        return environment_1.BACKEND_URL;
    }
    return environment_1.BACKEND_URL;
};
// Use absolute path when running on the server
exports.URQL_BACKEND_URL = getUrqlBackendUrl();
