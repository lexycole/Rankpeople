"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("@testing-library/react-native");
const urql_1 = require("urql");
const Rate_1 = __importDefault(require("../views/Tabs/Rate"));
const useRate = __importStar(require("./../hooks/useRate"));
jest.mock("@react-navigation/native", () => {
    const actualNav = jest.requireActual("@react-navigation/native");
    return Object.assign(Object.assign({}, actualNav), { useRoute: () => ({}) });
});
describe("<Rate/>", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockClient = {
        executeQuery: jest.fn(() => null),
    };
    const Screen = ((0, jsx_runtime_1.jsx)(urql_1.Provider, { value: mockClient, children: (0, jsx_runtime_1.jsx)(Rate_1.default, {}) }));
    test("rate component match snapshot", () => __awaiter(void 0, void 0, void 0, function* () {
        const rateComponent = (0, react_native_1.render)(Screen);
        const tree = rateComponent.toJSON();
        expect(tree).toMatchSnapshot();
    }));
    test("person name is defined", () => __awaiter(void 0, void 0, void 0, function* () {
        const rateComponent = (0, react_native_1.render)(Screen);
        expect(rateComponent.getByTestId("person-name")).toBeDefined();
    }));
    test("createRating called after submit button", () => __awaiter(void 0, void 0, void 0, function* () {
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
        const rateComponent = (0, react_native_1.render)(Screen);
        const submitButton = rateComponent.getByTestId("submit-button");
        (0, react_native_1.fireEvent)(submitButton, "click");
        expect(useRateResponse.createRating).toHaveBeenCalled();
    }));
});
