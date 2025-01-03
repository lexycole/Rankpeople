declare const useRandomPerson: () => {
    randomPerson: null;
    fetchPerson?: undefined;
} | {
    randomPerson: {
        __typename?: "Person";
        id: number;
        title: string;
        lastName: string;
    } | null | undefined;
    fetchPerson: import("urql").UseQueryExecute;
};
export default useRandomPerson;
//# sourceMappingURL=useRandomPerson.d.ts.map