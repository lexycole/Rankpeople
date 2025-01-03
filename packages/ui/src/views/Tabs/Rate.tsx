import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import usePeopleOverview from "../../hooks/usePeopleOverview";
import usePersonRating from "../../hooks/usePersonRating";
import useRandomPerson from "../../hooks/useRandomPerson";
import useRate from "../../hooks/useRate";
import tw from "../../utils/tailwind";
import { FRONTEND_URL } from "@repo/environment";


export interface Rating {
  feedback: string;
  value: number;
}  


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RateComponent = (props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const route: any = useRoute();
  const navigation = props.navigation;
  const paramsPersonId: number = route.params?.personId;

  const {
    value: rate,
    setValue: setRate,
    createRating,
    feedback,
    setFeedback,
    personId,
    setPersonId,
    fetchingRating,
  } = useRate();

  const { randomPerson, fetchPerson: fetchRandomPerson } = useRandomPerson();
  const { fetchOverview } = usePeopleOverview();
  const { person, ratings, averageRating, myRating, fetching } =
    usePersonRating(personId);

  useEffect(() => {
    /** fetch random person if personId is undefined from params */
    if (paramsPersonId) {
      setPersonId(paramsPersonId);
    } else if (randomPerson) {
      setPersonId(randomPerson.id);
    }

    setRate(0);
    setFeedback("");
  }, [paramsPersonId, randomPerson]);

  useEffect(() => {
    if (myRating) {
      setRate(myRating.value);
      setFeedback(myRating.feedback);
    }
  }, [myRating]);

  const onSubmitRating = async () => {
    const isSubmitted = await createRating();
    if (isSubmitted) {
      fetchOverview({ requestPolicy: "network-only" });
      fetchAnotherPerson();
    }
  };

  const fetchAnotherPerson = () => {
    if (fetchRandomPerson) {
      fetchRandomPerson({ requestPolicy: "network-only" });
      navigation.jumpTo("Rate", { personId: undefined });
    }
  };



  const filteredBestRatings = (ratings as Rating[])
  ?.filter((rating) => rating.feedback)
  .sort((ratingA, ratingB) => ratingB.value - ratingA.value)
  .slice(0, 10);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {person ? (
        <ScrollView style={tw`p-5`}>
          <Image
            style={tw`rounded-full self-center mb-5`}
            source={{
              uri: `${FRONTEND_URL}/human.png`,
              width: 200,
              height: 200,
            }}
          />
          <View style={tw`flex-col justify-center items-center`}>
            <Text
              style={tw`text-3xl text-center font-bold`}
              testID="person-name"
            >
              {person?.title} {person?.lastName}
            </Text>
            <View style={tw`flex-row justify-center items-center`}>
              <Text style={tw`text-3xl font-bold`}>{" ( "}</Text>
              <Ionicons color="orange" size={24} name={"star"} />
              <Text style={tw`text-3xl font-bold`}>
                {averageRating ? averageRating.toFixed(2) : "N/A"} {" | "}
                {ratings?.length} {"Ratings )"}
              </Text>
            </View>
          </View>

          <View style={tw`flex flex-row justify-evenly my-5`}>
            {/* Create 5 buttons with stars */}
            {[...Array(5)].map((_, i) => (
              <TouchableOpacity key={i} onPress={() => setRate(i + 1)}>
                <Ionicons
                  color="orange"
                  size={48}
                  name={rate >= i + 1 ? "star" : "star-outline"}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Feedback */}
          <TextInput
            style={tw`m-2 border-2 border-gray-400 h-40 text-lg p-4 rounded-xl`}
            placeholder="Feedback..."
            multiline={true}
            value={feedback}
            onChangeText={(value) => setFeedback(value)}
            maxLength={500}
          />

          <View style={tw`m-2`}>
            <Button
              disabled={rate === 0 || fetching || fetchingRating}
              title={myRating ? "Update Rating" : "Submit Rating"}
              testID="submit-button"
              onPress={onSubmitRating}
            />
          </View>
          <View style={tw`m-2`}>
            <Button
              color="brown"
              title="Skip Teacher"
              disabled={fetching}
              onPress={fetchAnotherPerson}
            />
          </View>

          <View style={tw`py-2`}>
            <Text style={tw`my-2 text-2xl underline text-center font-bold`}>
              Best Feedbacks
            </Text>

            {filteredBestRatings && filteredBestRatings.length > 0 ? (
              filteredBestRatings.map((rating, i) => {
                return (
                  <View style={tw`flex-row my-2 overflow-hidden`} key={i}>
                    <View style={tw`items-center`}>
                      <Ionicons color="orange" size={24} name={"star"} />
                      <Text style={tw`text-xl`}>{rating.value.toFixed(2)}</Text>
                    </View>
                    <Text style={tw`text-2xl font-bold`}>{"  -  "}</Text>
                    <Text style={tw`flex-1 text-xl`}>{rating.feedback}</Text>
                  </View>
                );
              })
            ) : (
              <Text style={tw`m-4 text-center text-gray-600 text-lg`}>
                No Feedbacks Found
              </Text>
            )}
          </View>
        </ScrollView>
      ) : (
        // Show loading indicator or no person found
        // center the loading indicator
        <View style={tw`flex-col justify-center items-center m-8`}>
          {fetching ? (
            <ActivityIndicator size="large" color="orange" />
          ) : (
            <Text style={tw`m-4 text-center text-gray-600 text-lg`}>
              No Person Found
            </Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default RateComponent;
