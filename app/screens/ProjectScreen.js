import { React, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { projectData } from "../model/data";
import ProjectItem from "../components/ProjectItem";

const ProjectScreen = () => {
  return (
    // <View>
    //   <Text>Project Screen</Text>
    // </View>
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ padding: 10 }}>
        {/* top header bar */}
        <View>
          {true == true &&
            projectData.map((item) => (
              <ProjectItem
                key={item.id}
                title={item.title}
                field={item.field}
                user={item.user}
              />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProjectScreen;
