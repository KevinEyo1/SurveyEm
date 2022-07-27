import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const ProcessTagScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, textAlign: "center" }}>
        Thanks for your submission. Our staff will contact the relevant schools
        and organizations to check your submission credibility.{" "}
      </Text>

      <TouchableOpacity
        style={styles.button}
        // onPress={() => navigation.popToTop().popToTop()}
        onPress={() => navigation.navigate("Home", { screen: "Home2" })}
      >
        <Text style={styles.buttonText}>Return to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProcessTagScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 50,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
