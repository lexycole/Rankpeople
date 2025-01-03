import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import tw from "../../utils/tailwind";

const AboutComponent = () => {
  return (
    <SafeAreaView>
      <View style={tw`m-4`}>
        <View style={tw`my-2`}>
          <Text style={tw`text-2xl font-bold`}>Disclaimer</Text>
          <Text style={tw`my-2`}>
            Rankpeople is not responsible for any of the content you publish on
            this app and will not be liable for any damages caused by the
            content you publish on this app.
          </Text>
        </View>

        <View style={tw`my-2`}>
          <Text style={tw`text-2xl font-bold`}>What is Rankpeople?</Text>
          <Text style={tw`my-2`}>
            Rankpeople is a platform for students to rate teachers in their
            school anonimously.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AboutComponent;
