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
      <View style={styles.contentView}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Text style={styles.tag}>{tag}</Text>

      {user != "" && (
        <View style={styles.postedView}>
          <Text style={styles.posted}>Posted by:</Text>
          <Text style={styles.user}>{user}</Text>
        </View>
      )}

      <View style={styles.buttonView}>
        <TouchableOpacity
          style={[styles.button, styles.viewButton]}
          onPress={() =>
            navigation.navigate("SingleProjectSurvey", { pid: pid, self: self })
          }
        >
          <Text style={styles.buttonContent}>View Surveys</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.commentsButton]}
          onPress={() =>
            navigation.navigate("ProjectComment", {
              pid: pid,
              self: self,
              title: title,
              tag: tag,
              description: description,
              user: user,
            })
          }
        >
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
    marginLeft: 25,
    borderWidth: 10,
    borderRadius: 30,
    borderColor: "white",
    backgroundColor: "#ADDBE6",
  },

  contentView: {
    alignItems: "baseline",
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginTop: 25,
    marginLeft: 20,
    marginBottom: 30,
  },

  title: {
    fontSize: 16,
    fontFamily: "InknutAntiqua_700Bold",
  },
  description: {
    fontSize: 12,
  },

  tag: {
    padding: 4,
    marginTop: 10,
    marginLeft: 10,
    position: "absolute",
    left: 0,
    borderRadius: 30,
    fontSize: 10,
    fontFamily: "OpenSans_700Bold",
    color: "white",
    backgroundColor: "#6D9CCF",
  },
  postedView: {
    padding: 5,
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
    marginLeft: 68,
    fontSize: 10,
    fontFamily: "OpenSans_400Regular_Italic",
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
    marginBottom: 10,
    // marginTop: 30,
    fontFamily: "OpenSans_700Bold",
    backgroundColor: "#C7755A",
  },

  viewButton: {
    marginLeft: 195,
  },
  commentsButton: {
    right: 250,
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
  rightbutton: {
    padding: 6,
    position: "absolute",
    left: 0,
    bottom: 0,
    marginBottom: 15,
    marginRight: 20,
    borderRadius: 20,
    fontSize: 10,
    fontFamily: "OpenSans_700Bold",
    backgroundColor: "#C7755A",
  },
});

export default ProjectItem;
