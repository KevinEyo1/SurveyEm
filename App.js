import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";

import AuthStack from "./app/navigation/AuthStack";
import AppStack from "./app/navigation/AppStack";

import AppLoading from "expo-app-loading";

import {
  useFonts,
  InknutAntiqua_700Bold,
} from "@expo-google-fonts/inknut-antiqua";

import {
  OpenSans_700Bold,
  OpenSans_400Regular_Italic,
  OpenSans_400Regular,
} from "@expo-google-fonts/open-sans";

import ProfileScreen from "./app/screens/ProfileScreen";

export default function App() {
  let [fontsLoaded] = useFonts({
    InknutAntiqua_700Bold,
    OpenSans_700Bold,
    OpenSans_400Regular_Italic,
    OpenSans_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
    // <ProfileScreen />
  );
}
