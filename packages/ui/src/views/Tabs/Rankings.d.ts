interface Rating {
    feedback: string;
    value: number;
}
interface RankingsProps {
    ratings?: Rating[];
    navigation: {
        jumpTo: (screen: string, params: any) => void;
        setOptions: (options: any) => void;
    };
}
declare const RankingsComponent: (props: RankingsProps) => import("react/jsx-runtime").JSX.Element;
export default RankingsComponent;
//# sourceMappingURL=Rankings.d.ts.map