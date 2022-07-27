import React from "react";
import { StyleSheet } from "react-native-web";
import { createStackNavigator } from "@react-navigation/stack";

import SchoolTagScreen from "../screens/SchoolTagScreen";
import WorkTagScreen from "../screens/WorkTagScreen";
import CreateTagScreen from "../screens/CreateTagScreen";
import ProcessTagScreen from "../screens/ProcessTagScreen";

const Stack = createStackNavigator();

function TagStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="CreateTag"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="CreateTag" component={CreateTagScreen} />
      <Stack.Screen name="SchoolTag" component={SchoolTagScreen} />
      <Stack.Screen name="WorkTag" component={WorkTagScreen} />
      <Stack.Screen name="ProcessTag" component={ProcessTagScreen} />
    </Stack.Navigator>
  );
}

export default TagStack;

const styles = StyleSheet.create({});
