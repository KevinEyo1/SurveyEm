import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import SurveyScreen from "../screens/SurveyScreen";
import CreateScreen from "../screens/CreateScreen";
import ProjectScreen from "../screens/ProjectScreen";
import RewardsScreen from "../screens/RewardsScreen";

const Tab = createBottomTabNavigator();

function TabNavigator({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "lightblue" },
        headerLeft: () => (
          <Ionicons
            name="menu-outline"
            style={{ paddingLeft: 15 }}
            size={32}
            onPress={() => navigation.openDrawer()}
          />
        ),
        headerRight: () => (
          <Ionicons
            name="paper-plane-outline"
            style={{ paddingRight: 15 }}
            size={27}
          />
        ),
        tabBarStyle: { backgroundColor: "lightblue" },
        tabBarInactiveTintColor: "#000",
      }}
    >
      <Tab.Screen
        name="Home2"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Survey"
        component={SurveyScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="document-text-outline" size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarShowLabel: false,

          tabBarIcon: ({ color }) => (
            <Ionicons name="add-outline" size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Projects"
        component={ProjectScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="briefcase-outline" size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="gift-outline" size={32} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
