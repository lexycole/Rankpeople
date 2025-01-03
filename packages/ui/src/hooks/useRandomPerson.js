"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const graphql_1 = require("../generated/graphql");
const useRandomPerson = () => {
    const [person, fetchPerson] = (0, graphql_1.useRandomPersonQuery)({
        pause: true,
    });
    (0, react_1.useEffect)(() => {
        fetchPerson();
    }, [fetchPerson]);
    if (!person.data) {
        return {
            randomPerson: null,
        };
    }
    return { randomPerson: person.data.getRandomPerson, fetchPerson };
};
exports.default = useRandomPerson;
