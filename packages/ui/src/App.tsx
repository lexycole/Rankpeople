import React from "react";
import type { ReactNode } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StatusBar, Platform } from "react-native";
import { Provider } from "urql";
import { client } from "./utils/urqlClient";
import AppTabs from "./views/AppTabs";

export const App = (): React.JSX.Element => {
  return (
    <Provider value={client}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar 
          translucent 
          backgroundColor="white" 
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'}
        />
          <AppTabs />
      </SafeAreaView>
    </Provider>
  );
};

export default App;