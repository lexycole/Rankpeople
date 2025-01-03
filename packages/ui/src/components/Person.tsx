import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Image, Text, TouchableHighlight } from "react-native";
import { FRONTEND_URL } from "@repo/environment";
import tw from "../utils/tailwind";
import { PersonOverview } from "../generated/graphql";

interface PersonProps {
  overview: PersonOverview;
  onPersonSelect: (id: number) => void;
}

const PersonComponent: React.FC<PersonProps> = ({
  overview: { person, average, numberOfRatings },
  onPersonSelect,
}) => {
  return (
    <TouchableHighlight
      onPress={onPersonSelect.bind(this, person.id)}
      underlayColor={"transparent"}
    >
      <View style={styles.personContainer}>
        <Image
          style={styles.personImage}
          source={{
            uri: `${FRONTEND_URL}/human.png`,
            width: 200,
            height: 200,
          }}
        />
        <View style={styles.personDetails}>
          <Text style={styles.personName} testID={person.id + "-person-name"}>
            {`${person.title} ${person.lastName}`}
          </Text>
          <View style={styles.personAvgRating}>
            <Ionicons color="orange" size={24} name={"star"} />
            <Text>{average ? average.toFixed(2) : "N/A"}</Text>

            <Text style={tw`mx-2`}>({numberOfRatings})</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = {
  personContainer: tw`flex flex-row shadow-lg shadow-black rounded-lg bg-white m-4`,
  personImage: tw`w-24 h-24 rounded-tl-lg rounded-bl-lg`,
  personDetails: tw`flex flex-1 items-center p-2`,
  personName: tw`flex-1 font-semibold text-lg`,
  personAvgRating: tw`flex flex-row items-center flex-1`,
};

export default PersonComponent;
