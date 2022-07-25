import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProjectScreen from "../screens/ProjectScreen";
import SingleProjectSurveyScreen from "../screens/SingleProjectSurveyScreen";
import DoSurveyQuestionsScreen from "../screens/DoSurveyQuestionsScreen";
import ProjectCommentScreen from "../screens/ProjectCommentScreen";

const Stack = createStackNavigator();

function ProjectStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Projects"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Projects" component={ProjectScreen} />
      <Stack.Screen
        name="SingleProjectSurvey"
        component={SingleProjectSurveyScreen}
      />
      <Stack.Screen
        name="DoSurveyQuestions"
        component={DoSurveyQuestionsScreen}
      />
      <Stack.Screen name="ProjectComment" component={ProjectCommentScreen} />
    </Stack.Navigator>
  );
}

export default ProjectStack;
