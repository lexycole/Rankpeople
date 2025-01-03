"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPersonRating = exports.createRating = void 0;
const core_1 = require("../core");
const profanity_filter_1 = require("@repo/profanity-filter");
const createRating = async (rating) => {
    if (!rating.value || !rating.person_id || !rating.user_id)
        return;
    if (rating.feedback) {
        rating.feedback = profanity_filter_1.filter.clean(rating.feedback);
    }
    // only allow one rating per user per person
    const existingRating = await core_1.prismaClient.rating.findFirst({
        where: {
            person_id: rating.person_id,
            user_id: rating.user_id,
        },
    });
    // if there is an existing rating, update it
    if (existingRating) {
        await core_1.prismaClient.rating.update({
            where: {
                id: existingRating.id,
            },
            data: {
                value: rating.value,
                feedback: rating.feedback,
            },
        });
    }
    else {
        await core_1.prismaClient.rating.create({
            data: {
                value: rating.value,
                person_id: rating.person_id,
                feedback: rating.feedback,
                user_id: rating.user_id,
            },
        });
    }
};
exports.createRating = createRating;
const getPersonRating = async (condition) => {
    const ratings = await core_1.prismaClient.rating.findMany({
        where: { ...condition },
    });
    return ratings;
};
exports.getPersonRating = getPersonRating;
//# sourceMappingURL=ratings.js.map