import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import IndexScreen from "../screens/IndexScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AppStack from "./AppStack";

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
    </Stack.Navigator>
  );
}

export default AuthStack;
