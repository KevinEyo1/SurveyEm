import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import IndexScreen from "../screens/IndexScreen";
import RegisterParticularsScreen from "../screens/RegisterParticularsScreen";

const Stack = createStackNavigator();

function AuthStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Index"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Index" component={IndexScreen} />
      {/* Login screen options headerBackVisible:false */}
      <Stack.Screen
        name="RegisterParticulars"
        component={RegisterParticularsScreen}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
