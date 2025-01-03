declare const useRate: () => {
    value: number;
    feedback: string;
    setValue: import("react").Dispatch<import("react").SetStateAction<number>>;
    setFeedback: import("react").Dispatch<import("react").SetStateAction<string>>;
    personId: number;
    setPersonId: import("react").Dispatch<import("react").SetStateAction<number>>;
    createRating: () => Promise<boolean>;
    fetchingRating: boolean;
};
export default useRate;
//# sourceMappingURL=useRate.d.ts.map