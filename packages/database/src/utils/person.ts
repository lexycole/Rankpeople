import { Person } from "@prisma/client";
import { prismaClient } from "../core";

export const createPerson = async (person: Person) => {
  await prismaClient.person.create({
    data: person,
  });
};

export const getPeople = async (): Promise<Person[]> => {
  const people = await prismaClient.person.findMany();
  return people;
};

export const getUnratedRandomPerson = async (
  userid: string,
): Promise<Person> => {
  const people = await prismaClient.person.findMany({
    where: {
      NOT: {
        rating: {
          some: {
            user_id: userid,
          },
        },
      },
    },
  });

  if (people.length === 0) {
    const people = await getPeople();
    return people[Math.floor(Math.random() * people.length)];
  }

  const person = people[Math.floor(Math.random() * people.length)];
  return person;
};

export const getPerson = async (
  condition: Partial<Person>,
): Promise<Person | null> => {
  const person = await prismaClient.person.findFirst({
    where: {
      ...condition,
    },
  });
  return person;
};
