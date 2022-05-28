import React from "react";
import {
  Image,
  View,
  TextInput,
  StyleSheet,
  Text,
  Dimensions,
  Button,
  SafeAreaView,
} from "react-native";
import { TouchableOpacity } from "react-native";

function RegisterParticularsScreen({ navigation }) {
  return (
    <SafeAreaView styles={styles.container}>
      <TextInput placeholder="First Name"></TextInput>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  particularsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RegisterParticularsScreen;
