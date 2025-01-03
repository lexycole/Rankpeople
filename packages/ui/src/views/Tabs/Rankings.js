"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const vector_icons_1 = require("@expo/vector-icons");
const react_1 = require("react");
const react_native_1 = require("react-native");
const Person_1 = __importDefault(require("../../components/Person"));
const usePeopleOverview_1 = __importDefault(require("../../hooks/usePeopleOverview"));
const tailwind_1 = __importDefault(require("../../utils/tailwind"));
const headerMarginTop = react_native_1.Platform.OS === "android" ? "pt-10" : "";
const RankingsComponent = (props) => {
    const [searchInput, setSearchInput] = (0, react_1.useState)("");
    const [showSearchHeader, setShowSearchHeader] = (0, react_1.useState)(false);
    const { overview, fetching } = (0, usePeopleOverview_1.default)();
    const navigation = props.navigation;
    const onPersonSelect = (personId) => {
        navigation.jumpTo("Rate", { personId });
    };
    (0, react_1.useEffect)(() => {
        navigation.setOptions({ header: () => null });
    }, []);
    const onSearch = (value) => {
        setSearchInput(value);
    };
    const onHeaderToggle = () => {
        setSearchInput("");
        setShowSearchHeader(!showSearchHeader);
    };
    const tabHeader = (0, react_1.useMemo)(() => {
        if (showSearchHeader)
            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [styles.searchTabContainer, (0, tailwind_1.default) `${headerMarginTop}`], children: [(0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { onPress: onHeaderToggle, children: (0, jsx_runtime_1.jsx)(vector_icons_1.Ionicons, { size: 24, name: "arrow-back-outline" }) }), (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { style: styles.searchInput, placeholder: "Search...", value: searchInput, autoFocus: true, onChangeText: onSearch }), searchInput !== null && searchInput !== void 0 ? searchInput : ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { onPress: () => setSearchInput(""), children: (0, jsx_runtime_1.jsx)(vector_icons_1.Ionicons, { size: 24, name: "close-outline" }) }))] }));
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [styles.defaultTabContainer, (0, tailwind_1.default) `${headerMarginTop}`], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.tabHeading, children: "Rankings" }), (0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { onPress: onHeaderToggle, children: (0, jsx_runtime_1.jsx)(vector_icons_1.Ionicons, { size: 24, name: "search-outline" }) })] }));
    }, [showSearchHeader, searchInput]);
    const filteredOverview = overview === null || overview === void 0 ? void 0 : overview.filter((teacherRecord) => `${teacherRecord.person.title} ${teacherRecord.person.lastName}`
        .toLowerCase()
        .indexOf(searchInput.toLowerCase().trim()) > -1);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.SafeAreaView, { style: { flex: 1 }, children: [tabHeader, filteredOverview && filteredOverview.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { children: filteredOverview.map((teacherRecord) => ((0, jsx_runtime_1.jsx)(Person_1.default, { overview: teacherRecord, onPersonSelect: onPersonSelect }, teacherRecord.person.id))) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tailwind_1.default) `flex-col justify-center items-center m-8`, children: fetching ? ((0, jsx_runtime_1.jsx)(react_native_1.ActivityIndicator, { size: "large", color: "orange" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: (0, tailwind_1.default) `m-4 text-center text-gray-600 text-lg`, children: "No Records Found" })) }))] }));
};
const styles = {
    noRecordsFound: (0, tailwind_1.default) `m-4 text-center text-gray-600 text-lg`,
    defaultTabContainer: (0, tailwind_1.default) `flex flex-row items-center justify-between p-4 bg-white`,
    searchTabContainer: (0, tailwind_1.default) `flex flex-row p-4 bg-white`,
    searchInput: (0, tailwind_1.default) `flex-1 ml-2`,
    tabHeading: (0, tailwind_1.default) `text-2xl font-bold`,
};
exports.default = RankingsComponent;
