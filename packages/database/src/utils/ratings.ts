import { Rating } from "@prisma/client";
import { prismaClient } from "../core";
import { filter } from "@repo/profanity-filter";

export const createRating = async (rating: Partial<Rating>) => {
  if (!rating.value || !rating.person_id || !rating.user_id) return;

  if (rating.feedback) {
    rating.feedback = filter.clean(rating.feedback);
  }

  // only allow one rating per user per person
  const existingRating = await prismaClient.rating.findFirst({
    where: {
      person_id: rating.person_id,
      user_id: rating.user_id,
    },
  });

  // if there is an existing rating, update it
  if (existingRating) {
    await prismaClient.rating.update({
      where: {
        id: existingRating.id,
      },
      data: {
        value: rating.value,
        feedback: rating.feedback,
      },
    });
  } else {
    await prismaClient.rating.create({
      data: {
        value: rating.value,
        person_id: rating.person_id,
        feedback: rating.feedback,
        user_id: rating.user_id,
      },
    });
  }
};

export const getPersonRating = async (
  condition: Partial<Rating>,
): Promise<Rating[]> => {
  const ratings = await prismaClient.rating.findMany({
    where: { ...condition },
  });
  return ratings;
};
