import { render, fireEvent } from "@testing-library/react-native";
import React from "react";
import { Provider } from "urql";
import Rate from "../views/Tabs/Rate";
import * as useRate from "./../hooks/useRate";

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useRoute: () => ({}),
  };
});

describe("<Rate/>", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockClient: any = {
    executeQuery: jest.fn(() => null),
  };

  const Screen = (
    <Provider value={mockClient}>
      <Rate />
    </Provider>
  );

  test("rate component match snapshot", async () => {
    const rateComponent = render(Screen);
    const tree = rateComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("person name is defined", async () => {
    const rateComponent = render(Screen);
    expect(rateComponent.getByTestId("person-name")).toBeDefined();
  });

  test("createRating called after submit button", async () => {
    const useRateResponse = {
      value: 3,
      feedback: "",
      personId: 1,
      fetchingRating: false,
      setValue: jest.fn(),
      setFeedback: jest.fn(),
      setPersonId: jest.fn(),
      createRating: jest.fn(),
    };

    jest.spyOn(useRate, "default").mockImplementation(() => useRateResponse);

    const rateComponent = render(Screen);
    const submitButton = rateComponent.getByTestId("submit-button");
    fireEvent(submitButton, "click");
    expect(useRateResponse.createRating).toHaveBeenCalled();
  });
});
