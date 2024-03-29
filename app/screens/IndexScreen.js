import React from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Button,
  SafeAreaView,
} from "react-native";
import { TouchableOpacity } from "react-native";

const loggedIn = true;

function IndexScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/SurveyEm-logo.png")}
          style={styles.logo}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          // loggedIn
          //   ? navigation.navigate("HomeScreen")
          //   : navigation.navigate("RegisterParticulars")
          navigation.replace("Login")
        }
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "lightblue",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    marginBottom: 5,
    height: 250,
    width: 250,
    alignSelf: "center",
  },
  logoName: {
    fontSize: 20,
    letterSpacing: 1,
  },
  logoContainer: {
    bottom: "50%",
  },
  button: {
    height: 80,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  buttonText: {
    fontSize: 25,
  },
});

export default IndexScreen;
