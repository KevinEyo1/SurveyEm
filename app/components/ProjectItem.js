import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

function ProjectItem({ pid, title, tag, description, user, self }) {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.tag}>{tag}</Text>
      <Text style={styles.description}>{description}</Text>
      {user != "" && (
        <View>
          <Text style={styles.posted}>Posted by: </Text>
          <Text style={styles.user}>{user}</Text>
        </View>
      )}

      {/* self bool do diff things */}
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={[styles.button, styles.viewButton]}
          onPress={() =>
            navigation.navigate("SingleProjectSurvey", { pid: pid, self: self })
          }
        >
          <Text style={styles.buttonContent}>View Surveys</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.commentsButton]}>
          <Text style={styles.buttonContent}>View Comments</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 314,
    height: 200,
    flex: 1,
    marginLeft: 25,
    borderWidth: 10,
    borderRadius: 30,
    borderColor: "white",
    backgroundColor: "#ADDBE6",
  },

  title: {
    padding: 30,
    marginTop: 5,
    fontSize: 16,
    fontFamily: "InknutAntiqua_700Bold",
  },
  tag: {
    padding: 4,
    marginTop: 15,
    marginLeft: 10,
    position: "absolute",
    left: 0,
    borderRadius: 30,
    fontSize: 10,
    fontFamily: "OpenSans_700Bold",
    color: "white",
    backgroundColor: "#6D9CCF",
  },
  description: {
    

  },
  posted: {
    padding: 20,
    position: "absolute",
    bottom: 0,
    marginLeft: 15,
    fontSize: 10,
    fontFamily: "OpenSans_400Regular",
  },
  user: {
    padding: 20,
    position: "absolute",
    bottom: 0,
    marginLeft: 70,
    fontSize: 10,
    fontFamily: "OpenSans_400Regular_Italic",
  },
  description: {
    marginTop: 100,
    position: "absolute",
  },
  points: {
    padding: 30,
    marginTop: 45,
    position: "absolute",
    alignContent: "center",
    fontSize: 12,
  },
  button: {
    padding: 6,
    borderRadius: 20,
    fontSize: 10,
    fontFamily: "OpenSans_700Bold",
    backgroundColor: "#C7755A",
  },
  viewButton: {
    marginLeft: 10,
  },
  commentsButton: {
    marginLeft: 90,
  },
  buttonContent: {
    fontSize: 10,
    fontFamily: "OpenSans_700Bold",
    color: "white",
  },
  buttonView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
  },
});

export default ProjectItem;
