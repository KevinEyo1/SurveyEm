import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import CreateStack from "./CreateStack";
import RewardsScreen from "../screens/RewardsScreen";
import HomeStack from "./HomeStack";
import SurveyStack from "./SurveyStack";
import ProjectStack from "./ProjectStack";

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
        tabBarStyle: { backgroundColor: "lightblue" },
        tabBarInactiveTintColor: "#000",
      }}
    >
      <Tab.Screen
        name="Home2"
        component={HomeStack}
        options={{
          title: "Home",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Survey Area"
        component={SurveyStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="document-text-outline" size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Create Items"
        component={CreateStack}
        options={{
          tabBarShowLabel: false,

          tabBarIcon: ({ color }) => (
            <Ionicons name="add-outline" size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Project Area"
        component={ProjectStack}
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
