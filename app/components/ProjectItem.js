import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

function ProjectItem({ title, field, user }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.field}>{field}</Text>
      <Text style={styles.posted}>Posted by: </Text>
      <Text style={styles.user}>{user}</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonContent}>View Project</Text>
      </TouchableOpacity>
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
  field: {
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
    position: "absolute",
    right: 0,
    bottom: 0,
    marginBottom: 15,
    marginRight: 20,
    borderRadius: 20,
    fontSize: 10,
    fontFamily: "OpenSans_700Bold",
    backgroundColor: "#C7755A",
  },
  buttonContent: {
    fontSize: 10,
    fontFamily: "OpenSans_700Bold",
    color: "white",
  },
});

export default ProjectItem;
