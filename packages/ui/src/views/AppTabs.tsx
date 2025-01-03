import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform, Text, View } from "react-native";
import tw from "../utils/tailwind";
import { AppTabsParamList } from "./ParamLists/AppTabsParamList";
import RankingsComponent from "./Tabs/Rankings";
import RateComponent from "./Tabs/Rate";
import AboutComponent from "./Tabs/About";
import SettingsComponent from "./Tabs/Settings";

const headerMarginTop = Platform.OS === "android" ? "pt-10" : "";

const Tabs = createBottomTabNavigator<AppTabsParamList>();

const AppTabs = () => {
  return (
    <Tabs.Navigator
      id={undefined}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

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
            default:
              iconName = "help-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        header: () => (
          <View style={tw`p-4 bg-white dark:bg-black ${headerMarginTop}`}>
            <Text style={tw`text-2xl font-bold`}>{route.name}</Text>
          </View>
        ),
      })}
    >
      <Tabs.Screen name="Rankings" component={RankingsComponent} />
      <Tabs.Screen 
        name="Rate" 
        component={RateComponent}
        initialParams={{ personId: 1 }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
              // Custom navigation
              navigation.navigate('Rate', { personId: 1 });
            
          },
        })}
      />
      <Tabs.Screen name="Settings" component={SettingsComponent} />
      <Tabs.Screen name="About" component={AboutComponent} />
    </Tabs.Navigator>
  );
};

export default AppTabs;
