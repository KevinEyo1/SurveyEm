import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SurveyScreen from "../screens/SurveyScreen";
import BookSurveyQuestionsScreen from "../screens/BookSurveyQuestionsScreen";
import DoSurveyQuestionsScreen from "../screens/DoSurveyQuestionsScreen";
import ViewResponsesScreen from "../screens/ViewResponsesScreen";

const Stack = createStackNavigator();

function SurveyStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Surveys"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Surveys" component={SurveyScreen} />
      <Stack.Screen
        name="BookSurveyQuestions"
        component={BookSurveyQuestionsScreen}
      />
      <Stack.Screen
        name="DoSurveyQuestions"
        component={DoSurveyQuestionsScreen}
      />
      <Stack.Screen name="View Responses" component={ViewResponsesScreen} />
    </Stack.Navigator>
  );
}

export default SurveyStack;
