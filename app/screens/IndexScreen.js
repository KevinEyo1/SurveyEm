import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";

function IndexScreen(props) {
  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/favicon.png")} style={styles.logo} />
        <Text style={styles.logoName}>SurveyEm</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 100,
    width: 100,
  },
  logoName: {
    fontSize: 20,
    letterSpacing: 1.5,
  },
  logoContainer: {
    bottom: 80,
  },
});

export default IndexScreen;
