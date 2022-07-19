import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProjectScreen from "../screens/ProjectScreen";

const Stack = createStackNavigator();

function ProjectStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Projects"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Projects" component={ProjectScreen} />
      {/* add screen for comments */}
    </Stack.Navigator>
  );
}

export default ProjectStack;
