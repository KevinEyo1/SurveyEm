import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import IndexScreen from "../screens/IndexScreen";
import RegisterParticularsScreen from "../screens/RegisterParticularsScreen";
import LoginScreen from "../screens/LoginScreen";
import AppStack from "./AppStack";
import RegisterScreen from "../screens/RegisterScreen";
import CreateProjectScreen from "../screens/CreateProjectScreen";

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
      <Stack.Screen name="Home3" component={AppStack} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="CreateProject" component={CreateProjectScreen} />
    </Stack.Navigator>
  );
}

export default AuthStack;
