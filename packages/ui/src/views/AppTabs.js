"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const vector_icons_1 = require("@expo/vector-icons");
const bottom_tabs_1 = require("@react-navigation/bottom-tabs");
const react_native_1 = require("react-native");
const tailwind_1 = __importDefault(require("../utils/tailwind"));
const Rankings_1 = __importDefault(require("./Tabs/Rankings"));
const Rate_1 = __importDefault(require("./Tabs/Rate"));
const About_1 = __importDefault(require("./Tabs/About"));
const Settings_1 = __importDefault(require("./Tabs/Settings"));
const headerMarginTop = react_native_1.Platform.OS === "android" ? "pt-10" : "";
const Tabs = (0, bottom_tabs_1.createBottomTabNavigator)();
const AppTabs = () => {
    return ((0, jsx_runtime_1.jsxs)(Tabs.Navigator, { screenOptions: ({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                switch (route.name) {
                    case "Rate":
                        iconName = focused ? "star" : "star-outline";
                        break;
                    case "Rankings":
                        iconName = focused ? "list" : "list-outline";
                        break;
                    case "About":
                        iconName = focused
                            ? "information-circle"
                            : "information-circle-outline";
                        break;
                    case "Settings":
                        iconName = focused ? "settings" : "settings-outline";
                        break;
                }
                return (0, jsx_runtime_1.jsx)(vector_icons_1.Ionicons, { name: iconName, size: size, color: color });
            },
            header: () => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tailwind_1.default) `p-4 bg-white dark:bg-black ${headerMarginTop}`, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: (0, tailwind_1.default) `text-2xl font-bold`, children: route.name }) })),
        }), children: [(0, jsx_runtime_1.jsx)(Tabs.Screen, { name: "Rankings", component: Rankings_1.default }), (0, jsx_runtime_1.jsx)(Tabs.Screen, { name: "Rate", component: Rate_1.default }), (0, jsx_runtime_1.jsx)(Tabs.Screen, { name: "Settings", component: Settings_1.default }), (0, jsx_runtime_1.jsx)(Tabs.Screen, { name: "About", component: About_1.default })] }));
};
exports.default = AppTabs;
