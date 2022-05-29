import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";

import AuthStack from "./app/navigation/AuthStack";
import AppStack from "./app/navigation/AppStack";

export default function App() {
  return (
    <NavigationContainer>
      {/* check logged in here then go auth stack or app stack */}
      <AuthStack />
    </NavigationContainer>
  );
}
