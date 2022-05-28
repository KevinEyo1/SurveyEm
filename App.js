import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";

import AuthStack from "./app/navigation/AuthStack";
import AppStack from "./app/navigation/AppStack";
import SurveyItem from "./app/components/SurveyItem";
import SurveyScreen from "./app/screens/SurveyScreen";
import TabNavigator from "./app/navigation/TabNavigator";

export default function App() {
  return (
    <NavigationContainer>
      {/* check logged in here then go auth stack or app stack */}
      <AppStack />
    </NavigationContainer>
  );
}
