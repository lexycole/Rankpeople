import { UseQueryArgs } from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};
export type Mutation = {
    __typename?: 'Mutation';
    createRating: Scalars['Boolean'];
};
export type MutationCreateRatingArgs = {
    RatingInput: RatingInput;
};
export type Person = {
    __typename?: 'Person';
    id: Scalars['Float'];
    lastName: Scalars['String'];
    title: Scalars['String'];
};
export type PersonOverview = {
    __typename?: 'PersonOverview';
    average?: Maybe<Scalars['Float']>;
    numberOfRatings: Scalars['Float'];
    person: Person;
};
export type PersonRating = {
    __typename?: 'PersonRating';
    feedback: Scalars['String'];
    value: Scalars['Float'];
};
export type Query = {
    __typename?: 'Query';
    getMyPersonRating?: Maybe<PersonRating>;
    getPeopleOverview: Array<PersonOverview>;
    getPersonAverageRating?: Maybe<Scalars['Float']>;
    getPersonFromID?: Maybe<Person>;
    getPersonRating: Array<PersonRating>;
    getRandomPerson?: Maybe<Person>;
};
export type QueryGetMyPersonRatingArgs = {
    personId: Scalars['Float'];
};
export type QueryGetPersonAverageRatingArgs = {
    personId: Scalars['Float'];
};
export type QueryGetPersonFromIdArgs = {
    personId: Scalars['Float'];
};
export type QueryGetPersonRatingArgs = {
    personId: Scalars['Float'];
};
export type RatingInput = {
    feedback: Scalars['String'];
    personId: Scalars['Float'];
    value: Scalars['Float'];
};
export type CreateRatingMutationVariables = Exact<{
    RatingInput: RatingInput;
}>;
export type CreateRatingMutation = {
    __typename?: 'Mutation';
    createRating: boolean;
};
export type GetPeopleOverviewQueryVariables = Exact<{
    [key: string]: never;
}>;
export type GetPeopleOverviewQuery = {
    __typename?: 'Query';
    getPeopleOverview: Array<{
        __typename?: 'PersonOverview';
        average?: number | null;
        numberOfRatings: number;
        person: {
            __typename?: 'Person';
            id: number;
            title: string;
            lastName: string;
        };
    }>;
};
export type PersonRatingQueryVariables = Exact<{
    PersonID: Scalars['Float'];
}>;
export type PersonRatingQuery = {
    __typename?: 'Query';
    getPersonAverageRating?: number | null;
    getPersonRating: Array<{
        __typename?: 'PersonRating';
        value: number;
        feedback: string;
    }>;
    getPersonFromID?: {
        __typename?: 'Person';
        id: number;
        title: string;
        lastName: string;
    } | null;
    getMyPersonRating?: {
        __typename?: 'PersonRating';
        value: number;
        feedback: string;
    } | null;
};
export type RandomPersonQueryVariables = Exact<{
    [key: string]: never;
}>;
export type RandomPersonQuery = {
    __typename?: 'Query';
    getRandomPerson?: {
        __typename?: 'Person';
        id: number;
        title: string;
        lastName: string;
    } | null;
};
export declare const CreateRatingDocument: import("graphql").DocumentNode;
export declare function useCreateRatingMutation(): import("urql").UseMutationResponse<CreateRatingMutation, Exact<{
    RatingInput: RatingInput;
}>>;
export declare const GetPeopleOverviewDocument: import("graphql").DocumentNode;
export declare function useGetPeopleOverviewQuery(options?: Omit<UseQueryArgs<GetPeopleOverviewQueryVariables>, 'query'>): import("urql").UseQueryResponse<GetPeopleOverviewQuery, Exact<{
    [key: string]: never;
}>>;
export declare const PersonRatingDocument: import("graphql").DocumentNode;
export declare function usePersonRatingQuery(options: Omit<UseQueryArgs<PersonRatingQueryVariables>, 'query'>): import("urql").UseQueryResponse<PersonRatingQuery, Exact<{
    PersonID: Scalars["Float"];
}>>;
export declare const RandomPersonDocument: import("graphql").DocumentNode;
export declare function useRandomPersonQuery(options?: Omit<UseQueryArgs<RandomPersonQueryVariables>, 'query'>): import("urql").UseQueryResponse<RandomPersonQuery, Exact<{
    [key: string]: never;
}>>;
//# sourceMappingURL=graphql.d.ts.map