import { Rating } from "@prisma/client";
export declare const createRating: (rating: Partial<Rating>) => Promise<void>;
export declare const getPersonRating: (condition: Partial<Rating>) => Promise<Rating[]>;
//# sourceMappingURL=ratings.d.ts.map