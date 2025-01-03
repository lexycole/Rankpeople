"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const tailwind_1 = __importDefault(require("../utils/tailwind"));
const next_themes_1 = require("next-themes");
const ToggleComponent = ({ defaultValue, onValueChange, }) => {
    const [switchOn, setSwitchOn] = (0, react_1.useState)(defaultValue !== null && defaultValue !== void 0 ? defaultValue : false);
    const { theme, setTheme } = (0, next_themes_1.useTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.Switch, { style: (0, tailwind_1.default) `inline`, value: switchOn, onValueChange: (value) => {
            setTheme(theme === 'light' ? 'dark' : 'light');
            setSwitchOn(value);
            onValueChange(value);
        } }));
};
exports.default = ToggleComponent;
