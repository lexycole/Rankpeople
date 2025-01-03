"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const ToggleComponent_1 = __importDefault(require("../../components/ToggleComponent"));
const tailwind_1 = __importDefault(require("../../utils/tailwind"));
const SettingsComponent = () => {
    return ((0, jsx_runtime_1.jsx)(react_native_1.SafeAreaView, { children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, tailwind_1.default) `m-4`, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: (0, tailwind_1.default) `inline text-lg`, children: "Dark Mode!" }), (0, jsx_runtime_1.jsx)(ToggleComponent_1.default, { defaultValue: false, onValueChange: console.log })] }) }));
};
exports.default = SettingsComponent;
