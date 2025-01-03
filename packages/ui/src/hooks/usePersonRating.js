"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const graphql_1 = require("../generated/graphql");
const usePersonRating = (PersonID) => {
    const [person, fetchPerson] = (0, graphql_1.usePersonRatingQuery)({
        pause: true,
        variables: {
            PersonID,
        },
    });
    (0, react_1.useEffect)(() => {
        fetchPerson({ requestPolicy: "network-only" });
    }, [fetchPerson, PersonID]);
    if (!person.data) {
        return {
            averageRating: null,
            myRating: null,
            person: null,
            ratings: null,
            fetchPerson,
            fetching: person.fetching,
        };
    }
    return {
        averageRating: person.data.getPersonAverageRating,
        myRating: person.data.getMyPersonRating,
        person: person.data.getPersonFromID,
        ratings: person.data.getPersonRating,
        fetchPerson,
        fetching: person.fetching,
    };
};
exports.default = usePersonRating;
