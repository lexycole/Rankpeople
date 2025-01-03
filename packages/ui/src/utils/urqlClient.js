"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.ssrCache = void 0;
const core_1 = require("@urql/core");
const constants_1 = require("./constants");
const environment_1 = require("@repo/environment");
exports.ssrCache = (0, core_1.ssrExchange)({ isClient: !environment_1.ON_SERVER });
exports.client = (0, core_1.createClient)({
    url: `${constants_1.URQL_BACKEND_URL}/graphql`,
    exchanges: [core_1.cacheExchange, exports.ssrCache, core_1.fetchExchange],
    fetchOptions: {
        credentials: "include",
    },
});
