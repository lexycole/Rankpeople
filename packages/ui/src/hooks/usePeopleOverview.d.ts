declare const usePeopleOverview: () => {
    overview: undefined;
    fetchOverview: import("urql").UseQueryExecute;
    fetching: boolean;
} | {
    overview: {
        __typename?: "PersonOverview";
        average?: number | null;
        numberOfRatings: number;
        person: {
            __typename?: "Person";
            id: number;
            title: string;
            lastName: string;
        };
    }[];
    fetchOverview: import("urql").UseQueryExecute;
    fetching: boolean;
};
export default usePeopleOverview;
//# sourceMappingURL=usePeopleOverview.d.ts.map