import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import ToggleComponent from "../../components/ToggleComponent";
import tw from "../../utils/tailwind";

const SettingsComponent = () => {
  return (
    <SafeAreaView>
      <View style={tw`m-4`}>
        <Text style={tw`inline text-lg`}>Dark Mode!</Text>
        <ToggleComponent defaultValue={false} onValueChange={console.log} />
      </View>
    </SafeAreaView>
  );
};

export default SettingsComponent;
