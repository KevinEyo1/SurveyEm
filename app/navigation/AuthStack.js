import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import IndexScreen from "../screens/IndexScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AppStack from "./AppStack";
import CreateProjectScreen from "../screens/CreateProjectScreen";
import CreateSurveyScreen from "../screens/CreateSurveyScreen";
import SurveyQuestionScreen from "../screens/SurveyQuestionScreen";

const Stack = createStackNavigator();

function AuthStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Index"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Index" component={IndexScreen} />
      {/* Login screen options headerBackVisible:false */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home3" component={AppStack} />
      <Stack.Screen name="CreateProject" component={CreateProjectScreen} />
      <Stack.Screen name="CreateSurvey" component={CreateSurveyScreen} />
      <Stack.Screen name="SurveyQuestions" component={SurveyQuestionScreen} />
    </Stack.Navigator>
  );
}

export default AuthStack;
