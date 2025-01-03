declare const usePersonRating: (PersonID: number) => {
    averageRating: null;
    myRating: null;
    person: null;
    ratings: null;
    fetchPerson: import("urql").UseQueryExecute;
    fetching: boolean;
} | {
    averageRating: number | null | undefined;
    myRating: {
        __typename?: "PersonRating";
        value: number;
        feedback: string;
    } | null | undefined;
    person: {
        __typename?: "Person";
        id: number;
        title: string;
        lastName: string;
    } | null | undefined;
    ratings: {
        __typename?: "PersonRating";
        value: number;
        feedback: string;
    }[];
    fetchPerson: import("urql").UseQueryExecute;
    fetching: boolean;
};
export default usePersonRating;
//# sourceMappingURL=usePersonRating.d.ts.map