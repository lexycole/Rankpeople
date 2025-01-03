"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const vector_icons_1 = require("@expo/vector-icons");
const react_native_1 = require("react-native");
const environment_1 = require("@repo/environment");
const tailwind_1 = __importDefault(require("../utils/tailwind"));
const PersonComponent = ({ overview: { person, average, numberOfRatings }, onPersonSelect, }) => {
    return ((0, jsx_runtime_1.jsx)(react_native_1.TouchableHighlight, { onPress: onPersonSelect.bind(this, person.id), underlayColor: "transparent", children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.personContainer, children: [(0, jsx_runtime_1.jsx)(react_native_1.Image, { style: styles.personImage, source: {
                        uri: `${environment_1.FRONTEND_URL}/human.png`,
                        width: 200,
                        height: 200,
                    } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.personDetails, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.personName, testID: person.id + "-person-name", children: `${person.title} ${person.lastName}` }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.personAvgRating, children: [(0, jsx_runtime_1.jsx)(vector_icons_1.Ionicons, { color: "orange", size: 24, name: "star" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { children: average ? average.toFixed(2) : "N/A" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: (0, tailwind_1.default) `mx-2`, children: ["(", numberOfRatings, ")"] })] })] })] }) }));
};
const styles = {
    personContainer: (0, tailwind_1.default) `flex flex-row shadow-lg shadow-black rounded-lg bg-white m-4`,
    personImage: (0, tailwind_1.default) `w-24 h-24 rounded-tl-lg rounded-bl-lg`,
    personDetails: (0, tailwind_1.default) `flex flex-1 items-center p-2`,
    personName: (0, tailwind_1.default) `flex-1 font-semibold text-lg`,
    personAvgRating: (0, tailwind_1.default) `flex flex-row items-center flex-1`,
};
exports.default = PersonComponent;
