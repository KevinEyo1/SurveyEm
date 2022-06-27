import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CreateScreen from "../screens/CreateScreen";
import CreateProjectScreen from "../screens/CreateProjectScreen";

const Stack = createStackNavigator();

function CreateStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Create"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Create" component={CreateScreen} />
      <Stack.Screen name="CreateProject" component={CreateProjectScreen} />
      {/* <Stack.Screen name="CreateSurvey" component={CreateSurveyScreen} /> */}
    </Stack.Navigator>
  );
}

export default CreateStack;
