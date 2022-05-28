import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";

import RegisterParticularsScreen from "../screens/RegisterParticularsScreen";

import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

function AppStack() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={32} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={RegisterParticularsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="log-out-outline" size={32} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default AppStack;
