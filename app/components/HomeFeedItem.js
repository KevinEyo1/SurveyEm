import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

function HomeFeedItem({ type, title, responder }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.type}>{type}</Text>
      </TouchableOpacity>

      <Text style={styles.responder}>{responder}</Text>
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

  type: {
    fontSize: 10,
    fontFamily: "OpenSans_700Bold",
    color: "white",
  },

  responder: {
    padding: 20,
    position: "absolute",
    bottom: 0,
    marginLeft: 10,
    fontSize: 10,
    fontFamily: "OpenSans_400Regular_Italic",
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
});

export default HomeFeedItem;
