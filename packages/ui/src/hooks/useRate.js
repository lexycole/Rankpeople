"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const graphql_1 = require("../generated/graphql");
const useRate = () => {
    const [value, setValue] = (0, react_1.useState)(0);
    const [personId, setPersonId] = (0, react_1.useState)(1);
    const [feedback, setFeedback] = (0, react_1.useState)("");
    const [rating, createRatingMutation] = (0, graphql_1.useCreateRatingMutation)();
    const createRating = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield createRatingMutation({
                RatingInput: { feedback, personId, value },
            });
            if (!response.error) {
                return true;
            }
            throw response.error;
        }
        catch (error) {
            return false;
        }
    });
    return {
        value,
        feedback,
        setValue,
        setFeedback,
        personId,
        setPersonId,
        createRating,
        fetchingRating: rating.fetching,
    };
};
exports.default = useRate;
