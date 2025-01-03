"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const tailwind_1 = __importDefault(require("../../utils/tailwind"));
const AboutComponent = () => {
    return ((0, jsx_runtime_1.jsx)(react_native_1.SafeAreaView, { children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, tailwind_1.default) `m-4`, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, tailwind_1.default) `my-2`, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: (0, tailwind_1.default) `text-2xl font-bold`, children: "Disclaimer" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: (0, tailwind_1.default) `my-2`, children: "Rankpeople is not responsible for any of the content you publish on this app and will not be liable for any damages caused by the content you publish on this app." })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, tailwind_1.default) `my-2`, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: (0, tailwind_1.default) `text-2xl font-bold`, children: "What is Rankpeople?" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: (0, tailwind_1.default) `my-2`, children: "Rankpeople is a platform for students to rate teachers in their school anonimously." })] })] }) }));
};
exports.default = AboutComponent;
