import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const CreateTagScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("SchoolTag")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>School</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("WorkTag")}
        style={[styles.button, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>Work</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateTagScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
