import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";

import CreateTagScreen from "../screens/CreateTagScreen";
import MyRewardsScreen from "../screens/MyRewardsScreen";
import LogoutScreen from "../screens/LogoutScreen";

// import { auth } from "../../firebase";
// import { signOut } from "firebase/auth";

import TabNavigator from "./TabNavigator";
import AuthStack from "./AuthStack";

const Drawer = createDrawerNavigator();

function AppStack() {
  // const handleSignOut = () => {
  //   signOut(auth)
  //     .then(() => {
  //       navigation.replace(AuthStack);
  //       console.log("Signed Out");
  //     })
  //     .catch((error) => alert(error.message));
  // };

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('drawerItemPress', (e) => {
  //     // Prevent default behavior
  //     e.preventDefault();
  //     handleSignOut();
  // //   });

  //   return unsubscribe;
  // }, [navigation]);

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
        name="Add Tags"
        component={CreateTagScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="log-out-outline" size={32} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Rewards"
        component={MyRewardsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="log-out-outline" size={32} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
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
