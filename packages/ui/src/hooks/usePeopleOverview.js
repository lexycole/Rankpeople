"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const graphql_1 = require("../generated/graphql");
const usePeopleOverview = () => {
    const [overview, fetchOverview] = (0, graphql_1.useGetPeopleOverviewQuery)({
        pause: true,
    });
    (0, react_1.useEffect)(() => {
        fetchOverview();
    }, [fetchOverview]);
    if (!overview.data) {
        return {
            overview: undefined,
            fetchOverview,
            fetching: overview.fetching,
        };
    }
    return {
        overview: overview.data.getPeopleOverview,
        fetchOverview,
        fetching: overview.fetching,
    };
};
exports.default = usePeopleOverview;
