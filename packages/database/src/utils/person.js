"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPerson = exports.getUnratedRandomPerson = exports.getPeople = exports.createPerson = void 0;
const core_1 = require("../core");
const createPerson = async (person) => {
    await core_1.prismaClient.person.create({
        data: person,
    });
};
exports.createPerson = createPerson;
const getPeople = async () => {
    const people = await core_1.prismaClient.person.findMany();
    return people;
};
exports.getPeople = getPeople;
const getUnratedRandomPerson = async (userid) => {
    const people = await core_1.prismaClient.person.findMany({
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
        const people = await (0, exports.getPeople)();
        return people[Math.floor(Math.random() * people.length)];
    }
    const person = people[Math.floor(Math.random() * people.length)];
    return person;
};
exports.getUnratedRandomPerson = getUnratedRandomPerson;
const getPerson = async (condition) => {
    const person = await core_1.prismaClient.person.findFirst({
        where: {
            ...condition,
        },
    });
    return person;
};
exports.getPerson = getPerson;
//# sourceMappingURL=person.js.map