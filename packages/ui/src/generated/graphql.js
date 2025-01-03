"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomPersonDocument = exports.PersonRatingDocument = exports.GetPeopleOverviewDocument = exports.CreateRatingDocument = void 0;
exports.useCreateRatingMutation = useCreateRatingMutation;
exports.useGetPeopleOverviewQuery = useGetPeopleOverviewQuery;
exports.usePersonRatingQuery = usePersonRatingQuery;
exports.useRandomPersonQuery = useRandomPersonQuery;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const urql_1 = require("urql");
exports.CreateRatingDocument = (0, graphql_tag_1.default) `
    mutation CreateRating($RatingInput: RatingInput!) {
  createRating(RatingInput: $RatingInput)
}
`;
function useCreateRatingMutation() {
    return (0, urql_1.useMutation)(exports.CreateRatingDocument);
}
exports.GetPeopleOverviewDocument = (0, graphql_tag_1.default) `
    query GetPeopleOverview {
  getPeopleOverview {
    average
    numberOfRatings
    person {
      id
      title
      lastName
    }
  }
}
`;
function useGetPeopleOverviewQuery(options) {
    return (0, urql_1.useQuery)(Object.assign({ query: exports.GetPeopleOverviewDocument }, options));
}
exports.PersonRatingDocument = (0, graphql_tag_1.default) `
    query PersonRating($PersonID: Float!) {
  getPersonRating(personId: $PersonID) {
    value
    feedback
  }
  getPersonAverageRating(personId: $PersonID)
  getPersonFromID(personId: $PersonID) {
    id
    title
    lastName
  }
  getMyPersonRating(personId: $PersonID) {
    value
    feedback
  }
}
`;
function usePersonRatingQuery(options) {
    return (0, urql_1.useQuery)(Object.assign({ query: exports.PersonRatingDocument }, options));
}
exports.RandomPersonDocument = (0, graphql_tag_1.default) `
    query RandomPerson {
  getRandomPerson {
    id
    title
    lastName
  }
}
`;
function useRandomPersonQuery(options) {
    return (0, urql_1.useQuery)(Object.assign({ query: exports.RandomPersonDocument }, options));
}
