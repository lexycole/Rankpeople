import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PersonComponent from "../../components/Person";
import { PersonOverview } from "../../generated/graphql";
import usePeopleOverview from "../../hooks/usePeopleOverview";
import tw from "../../utils/tailwind";

const headerMarginTop = Platform.OS === "android" ? "pt-10" : "";

interface Rating {
  feedback: string;
  value: number;
}

interface Person {
  id: string;
  title: string;
  lastName: string;
  // Add other person properties you're using
}

interface TeacherRecord {
  person: Person;
  numberOfRatings: number;  // Add this required field
  // Add any other fields required by PersonOverview
}

interface RankingsProps {
  ratings?: Rating[];
  navigation: {
    jumpTo: (screen: string, params: any) => void;
    setOptions: (options: any) => void;
  };
}

interface PersonComponentProps {
  overview: TeacherRecord;
  onPersonSelect: (personId: number) => void;
}

const RankingsComponent = (props: RankingsProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [showSearchHeader, setShowSearchHeader] = useState(false);
  const { overview, fetching } = usePeopleOverview();
  const navigation = props.navigation;

  const onPersonSelect = (personId: number) => {
    navigation.jumpTo("Rate", { personId });
  };

  useEffect(() => {
    navigation.setOptions({ header: () => null });
  }, []);

  const onSearch = (value: string) => {
    setSearchInput(value);
  };

  const onHeaderToggle = () => {
    setSearchInput("");
    setShowSearchHeader(!showSearchHeader);
  };

  const tabHeader = useMemo(() => {
    if (showSearchHeader)
      return (
        <View style={[styles.searchTabContainer, tw`${headerMarginTop}`]}>
          <TouchableOpacity onPress={onHeaderToggle}>
            <Ionicons size={24} name={"arrow-back-outline"} />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchInput}
            autoFocus={true}
            onChangeText={onSearch}
          />
          {searchInput ?? (
            <TouchableOpacity onPress={() => setSearchInput("")}>
              <Ionicons size={24} name={"close-outline"} />
            </TouchableOpacity>
          )}
        </View>
      );

    return (
      <View style={[styles.defaultTabContainer, tw`${headerMarginTop}`]}>
        <Text style={styles.tabHeading}>Rankings</Text>
        <TouchableOpacity onPress={onHeaderToggle}>
          <Ionicons size={24} name={"search-outline"} />
        </TouchableOpacity>
      </View>
    );
  }, [showSearchHeader, searchInput]);

  const filteredOverview = overview?.filter(
    (teacherRecord: PersonOverview) =>
      `${teacherRecord.person.title} ${teacherRecord.person.lastName}`
        .toLowerCase()
        .indexOf(searchInput.toLowerCase().trim()) > -1,
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
    {tabHeader}
    {filteredOverview && filteredOverview.length > 0 ? (
      <ScrollView>
        {filteredOverview.map((teacherRecord: PersonOverview) => (
          <PersonComponent
            key={teacherRecord.person.id}
            overview={teacherRecord}
            onPersonSelect={onPersonSelect}
          />
        ))}
      </ScrollView>
      ) : (
        <View style={tw`flex-col justify-center items-center m-8`}>
          {fetching ? (
            <ActivityIndicator size="large" color="orange" />
          ) : (
            <Text style={tw`m-4 text-center text-gray-600 text-lg`}>
              No Records Found
            </Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = {
  noRecordsFound: tw`m-4 text-center text-gray-600 text-lg`,
  defaultTabContainer: tw`flex flex-row items-center justify-between p-4 bg-white`,
  searchTabContainer: tw`flex flex-row p-4 bg-white`,
  searchInput: tw`flex-1 ml-2`,
  tabHeading: tw`text-2xl font-bold`,
};

export default RankingsComponent;