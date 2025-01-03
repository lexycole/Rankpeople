// import { render } from "@testing-library/react-native";
// import React from "react";
// import * as usePeopleOverview from "../hooks/usePeopleOverview";
// import Rankings from "../views/Tabs/Rankings";

// describe("<Rankings />", () => {
//   const Screen = <Rankings navigation={{ setOptions: jest.fn() }} />;

//   test("rankings component match snapshot", async () => {
//     jest.spyOn(usePeopleOverview, "default").mockImplementation(() => ({
//       overview: [],
//       fetchOverview: jest.fn(),
//     }));

//     const rankingsComponent = render(Screen);
//     const tree = rankingsComponent.toJSON();
//     expect(tree).toMatchSnapshot();
//   });

//   it("no records found if list empty", () => {
//     jest.spyOn(usePeopleOverview, "default").mockImplementation(() => ({
//       overview: [],
//       fetchOverview: jest.fn(),
//     }));

//     const rankingsComponent = render(Screen);
//     expect(rankingsComponent.getByTestId("no-records-found")).toBeDefined();
//   });

//   it("person name in list rendered", () => {
//     jest.spyOn(usePeopleOverview, "default").mockImplementation(() => ({
//       overview: [
//         {
//           person: {
//             id: 1,
//             title: "Mr.",
//             lastName: "Doe",
//           },
//           average: 3,
//         },
//       ],
//       fetchOverview: jest.fn(),
//     }));

//     const rankingsComponent = render(Screen);
//     expect(rankingsComponent.getByTestId("1-person-name")).toBeDefined();
//   });
// });
