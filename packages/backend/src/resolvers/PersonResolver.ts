import {
  getPeople,
  getPerson,
  getPersonRating,
  getUnratedRandomPerson,
} from "@repo/database";
import type { MyContext } from "../utils/MyContext";
import { Arg, Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";
import "reflect-metadata";


@ObjectType()
export class Person {
  @Field()
  id!: number;

  @Field()
  title!: string;

  @Field()
  lastName!: string;
}

@ObjectType()
export class PersonOverview {
  @Field({ nullable: true })
  average?: number;

  @Field()
  numberOfRatings!: number;

  @Field(() => Person)
  person!: Person;
}

@Resolver(of => Person)
export class PersonResolver {
  @Query(() => Person, { nullable: true })
  async getRandomPerson(
    @Ctx() { req }: MyContext
  ): Promise<Person | null> {
    if (!req.session) {
      const people = await getPeople();
      const randomPerson = people[Math.floor(Math.random() * people.length)];

      if (!randomPerson) return null;

      return {
        id: randomPerson.id,
        title: randomPerson.title,
        lastName: randomPerson.last_name,
      };
    }

    const person = await getUnratedRandomPerson(req.session.userid);

    if (!person) return null;

    return {
      id: person.id,
      title: person.title,
      lastName: person.last_name,
    };
  }

  @Query(() => Person, { nullable: true })
  async getPersonFromID(
    @Arg("personId") id: number
  ): Promise<Person | null> {
    const person = await getPerson({ id });

    if (!person) {
      return null;
    }

    return {
      id: person.id,
      title: person.title,
      lastName: person.last_name,
    };
  }

  @Query(() => [PersonOverview])
  async getPeopleOverview(): Promise<PersonOverview[]> {
    const people = await getPeople();
    const peopleAverageRating: PersonOverview[] = [];

    for (const person of people) {
      const ratings = await getPersonRating({ person_id: person.id });
      const average =
        ratings.length === 0
          ? undefined
          : ratings.reduce((acc, curr) => acc + curr.value, 0) / ratings.length;

      peopleAverageRating.push({
        average,
        numberOfRatings: ratings.length,
        person: {
          id: person.id,
          title: person.title,
          lastName: person.last_name,
        },
      });
    }

    peopleAverageRating.sort((a, b) => {
      if (!b.average) return -1;
      else if (!a.average) return 1;

      return b.average - a.average;
    });

    return peopleAverageRating;
  }
}