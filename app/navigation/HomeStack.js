import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import SingleProjectSurveyScreen from "../screens/SingleProjectSurveyScreen";
import CreateSurveyQuestionsScreen from "../screens/CreateSurveyQuestionsScreen";
import ViewResponsesScreen from "../screens/ViewResponsesScreen";

const Stack = createStackNavigator();

function HomeStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Home3"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home3" component={HomeScreen} />
      <Stack.Screen
        name="SingleProjectSurvey"
        component={SingleProjectSurveyScreen}
      />
      <Stack.Screen
        name="Edit Survey"
        component={CreateSurveyQuestionsScreen}
      />
      <Stack.Screen name="View Responses" component={ViewResponsesScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
