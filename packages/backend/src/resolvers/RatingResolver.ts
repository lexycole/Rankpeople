import {
  Field,
  Resolver,
  Mutation,
  InputType,
  Arg,
  Query,
  ObjectType,
  Ctx,
} from "type-graphql";
import { createRating, getPersonRating } from "@repo/database";
import type { MyContext } from "../utils/MyContext";

@InputType()
class RatingInput {
  @Field(() => Number)
  value!: number;

  @Field(() => String)
  feedback!: string;

  @Field(() => Number)
  personId!: number;
}

@ObjectType()
class PersonRating {
  @Field(() => Number)
  value!: number;

  @Field(() => String, { nullable: true }) // Fix for TS2322
  feedback!: string | null;
}

@Resolver()
export class RatingResolver {
  @Mutation(() => Boolean)
  async createRating(
    @Ctx() { req }: MyContext, // Fix for TS1272
    @Arg("ratingInput") ratingInput: RatingInput
  ): Promise<boolean> {
    if (!req.session) return false;

    await createRating({
      value: ratingInput.value,
      feedback: ratingInput.feedback,
      person_id: ratingInput.personId,
      user_id: req.session.userid,
    });

    return true;
  }

  @Query(() => [PersonRating])
  async getPersonRating(@Arg("personId") personId: number): Promise<PersonRating[]> {
    const ratings = await getPersonRating({ person_id: personId });
    return ratings.map(
      (rating) =>
        ({
          value: rating.value,
          feedback: rating.feedback,
        } as PersonRating)
    );
  }

  @Query(() => PersonRating, { nullable: true })
  async getMyPersonRating(
    @Ctx() { req }: MyContext, // Fix for TS1272
    @Arg("personId") personId: number
  ): Promise<PersonRating | null> {
    if (!req.session) return null;

    const ratings = await getPersonRating({
      person_id: personId,
      user_id: req.session.userid,
    });

    if (ratings.length === 0) {
      return null;
    }

    return ratings[0]; // Feedback type now aligns with PersonRating
  }

  @Query(() => Number, { nullable: true })
  async getPersonAverageRating(@Arg("personId") personId: number): Promise<number | null> {
    const ratings = await getPersonRating({ person_id: personId });
    if (ratings.length === 0) {
      return null;
    }
    const sum = ratings.reduce((acc, rating) => acc + rating.value, 0);
    return sum / ratings.length;
  }
}
