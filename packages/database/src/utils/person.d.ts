import { Person } from "@prisma/client";
export declare const createPerson: (person: Person) => Promise<void>;
export declare const getPeople: () => Promise<Person[]>;
export declare const getUnratedRandomPerson: (userid: string) => Promise<Person>;
export declare const getPerson: (condition: Partial<Person>) => Promise<Person | null>;
//# sourceMappingURL=person.d.ts.map