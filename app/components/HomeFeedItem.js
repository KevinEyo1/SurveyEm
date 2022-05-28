import React from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";

function HomeFeedItem({ type, title, responder }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.type}>{type}</Text>
      <Text style={styles.responder}>{responder}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 10,
    borderColor: "white",
    backgroundColor: "lightblue",
    height: 150,
  },
  title: { padding: 20 },
  type: { padding: 20, position: "absolute", right: 0 },
  responder: { padding: 20, position: "absolute", bottom: 0 },
});

export default HomeFeedItem;
