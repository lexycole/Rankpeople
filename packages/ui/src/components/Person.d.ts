import React from "react";
import { PersonOverview } from "../generated/graphql";
interface PersonProps {
    overview: PersonOverview;
    onPersonSelect: (id: number) => void;
}
declare const PersonComponent: React.FC<PersonProps>;
export default PersonComponent;
//# sourceMappingURL=Person.d.ts.map