"use strict";
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
const vector_icons_1 = require("@expo/vector-icons");
const native_1 = require("@react-navigation/native");
const react_1 = require("react");
const react_native_1 = require("react-native");
const usePeopleOverview_1 = __importDefault(require("../../hooks/usePeopleOverview"));
const usePersonRating_1 = __importDefault(require("../../hooks/usePersonRating"));
const useRandomPerson_1 = __importDefault(require("../../hooks/useRandomPerson"));
const useRate_1 = __importDefault(require("../../hooks/useRate"));
const tailwind_1 = __importDefault(require("../../utils/tailwind"));
const environment_1 = require("@repo/environment");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RateComponent = (props) => {
    var _a;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const route = (0, native_1.useRoute)();
    const navigation = props.navigation;
    const paramsPersonId = (_a = route.params) === null || _a === void 0 ? void 0 : _a.personId;
    const { value: rate, setValue: setRate, createRating, feedback, setFeedback, personId, setPersonId, fetchingRating, } = (0, useRate_1.default)();
    const { randomPerson, fetchPerson: fetchRandomPerson } = (0, useRandomPerson_1.default)();
    const { fetchOverview } = (0, usePeopleOverview_1.default)();
    const { person, ratings, averageRating, myRating, fetching } = (0, usePersonRating_1.default)(personId);
    (0, react_1.useEffect)(() => {
        /** fetch random person if personId is undefined from params */
        if (paramsPersonId) {
            setPersonId(paramsPersonId);
        }
        else if (randomPerson) {
            setPersonId(randomPerson.id);
        }
        setRate(0);
        setFeedback("");
    }, [paramsPersonId, randomPerson]);
    (0, react_1.useEffect)(() => {
        if (myRating) {
            setRate(myRating.value);
            setFeedback(myRating.feedback);
        }
    }, [myRating]);
    const onSubmitRating = () => __awaiter(void 0, void 0, void 0, function* () {
        const isSubmitted = yield createRating();
        if (isSubmitted) {
            fetchOverview({ requestPolicy: "network-only" });
            fetchAnotherPerson();
        }
    });
    const fetchAnotherPerson = () => {
        if (fetchRandomPerson) {
            fetchRandomPerson({ requestPolicy: "network-only" });
            navigation.jumpTo("Rate", { personId: undefined });
        }
    };
    const filteredBestRatings = ratings === null || ratings === void 0 ? void 0 : ratings.filter((rating) => rating.feedback).sort((ratingA, ratingB) => ratingB.value - ratingA.value).slice(0, 10);
    return ((0, jsx_runtime_1.jsx)(react_native_1.SafeAreaView, { style: { flex: 1 }, children: person ? ((0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { style: (0, tailwind_1.default) `p-5`, children: [(0, jsx_runtime_1.jsx)(react_native_1.Image, { style: (0, tailwind_1.default) `rounded-full self-center mb-5`, source: {
                        uri: `${environment_1.FRONTEND_URL}/human.png`,
                        width: 200,
                        height: 200,
                    } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, tailwind_1.default) `flex-col justify-center items-center`, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: (0, tailwind_1.default) `text-3xl text-center font-bold`, testID: "person-name", children: [person === null || person === void 0 ? void 0 : person.title, " ", person === null || person === void 0 ? void 0 : person.lastName] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, tailwind_1.default) `flex-row justify-center items-center`, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: (0, tailwind_1.default) `text-3xl font-bold`, children: " ( " }), (0, jsx_runtime_1.jsx)(vector_icons_1.Ionicons, { color: "orange", size: 24, name: "star" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: (0, tailwind_1.default) `text-3xl font-bold`, children: [averageRating ? averageRating.toFixed(2) : "N/A", " ", " | ", ratings === null || ratings === void 0 ? void 0 : ratings.length, " ", "Ratings )"] })] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tailwind_1.default) `flex flex-row justify-evenly my-5`, children: [...Array(5)].map((_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { onPress: () => setRate(i + 1), children: (0, jsx_runtime_1.jsx)(vector_icons_1.Ionicons, { color: "orange", size: 48, name: rate >= i + 1 ? "star" : "star-outline" }) }, i))) }), (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { style: (0, tailwind_1.default) `m-2 border-2 border-gray-400 h-40 text-lg p-4 rounded-xl`, placeholder: "Feedback...", multiline: true, value: feedback, onChangeText: (value) => setFeedback(value), maxLength: 500 }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tailwind_1.default) `m-2`, children: (0, jsx_runtime_1.jsx)(react_native_1.Button, { disabled: rate === 0 || fetching || fetchingRating, title: myRating ? "Update Rating" : "Submit Rating", testID: "submit-button", onPress: onSubmitRating }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tailwind_1.default) `m-2`, children: (0, jsx_runtime_1.jsx)(react_native_1.Button, { color: "brown", title: "Skip Teacher", disabled: fetching, onPress: fetchAnotherPerson }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, tailwind_1.default) `py-2`, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: (0, tailwind_1.default) `my-2 text-2xl underline text-center font-bold`, children: "Best Feedbacks" }), filteredBestRatings && filteredBestRatings.length > 0 ? (filteredBestRatings.map((rating, i) => {
                            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, tailwind_1.default) `flex-row my-2 overflow-hidden`, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, tailwind_1.default) `items-center`, children: [(0, jsx_runtime_1.jsx)(vector_icons_1.Ionicons, { color: "orange", size: 24, name: "star" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: (0, tailwind_1.default) `text-xl`, children: rating.value.toFixed(2) })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: (0, tailwind_1.default) `text-2xl font-bold`, children: "  -  " }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: (0, tailwind_1.default) `flex-1 text-xl`, children: rating.feedback })] }, i));
                        })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: (0, tailwind_1.default) `m-4 text-center text-gray-600 text-lg`, children: "No Feedbacks Found" }))] })] })) : (
        // Show loading indicator or no person found
        // center the loading indicator
        (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tailwind_1.default) `flex-col justify-center items-center m-8`, children: fetching ? ((0, jsx_runtime_1.jsx)(react_native_1.ActivityIndicator, { size: "large", color: "orange" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: (0, tailwind_1.default) `m-4 text-center text-gray-600 text-lg`, children: "No Person Found" })) })) }));
};
exports.default = RateComponent;
