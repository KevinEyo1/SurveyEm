import React from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";

function SurveyItem({ title, field, user, points }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.field}>{field}</Text>
      <Text style={styles.user}>{user}</Text>
      <Text style={styles.points}>{points}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 314,
    height: 180,
    flex: 1,
    borderWidth: 10,
    borderColor: "white",
    backgroundColor: "#ADDBE6",
  },
  title: {
    padding: 23,
    fontSize: 20,
    fontFamily: "roboto",
  },
  field: {
    padding: 20,
    position: "absolute",
    right: 0,
  },
  user: {
    padding: 20,
    position: "absolute",
    bottom: 0,
  },
  points: {
    padding: 20,
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});

export default SurveyItem;
