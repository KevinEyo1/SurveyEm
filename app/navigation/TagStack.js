import React from "react";
import { StyleSheet } from "react-native-web";
import { createStackNavigator } from "@react-navigation/stack";

import SchoolTagScreen from "../screens/SchoolTagScreen";
import CreateTagScreen from "../screens/CreateTagScreen";

const Stack = createStackNavigator();

function TagStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="CreateTag"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="CreateTag" component={CreateTagScreen} />
      <Stack.Screen name="SchoolTag" component={SchoolTagScreen} />
    </Stack.Navigator>
  );
}

export default TagStack;

const styles = StyleSheet.create({});
