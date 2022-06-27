import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CreateScreen from "../screens/CreateScreen";
import CreateProjectScreen from "../screens/CreateProjectScreen";
import CreateSurveyScreen from "../screens/CreateSurveyScreen";
import CreateSurveyQuestionsScreen from "../screens/CreateSurveyQuestionsScreen";

const Stack = createStackNavigator();

function CreateStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Create"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Create" component={CreateScreen} />
      <Stack.Screen name="CreateProject" component={CreateProjectScreen} />
      <Stack.Screen name="CreateSurvey" component={CreateSurveyScreen} />
      <Stack.Screen
        name="CreateSurveyQuestions"
        component={CreateSurveyQuestionsScreen}
      />
    </Stack.Navigator>
  );
}

export default CreateStack;
