import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TrueFalseItem = ({ question, answers }) => {
  return (
    <View>
      <Text style={{ padding: 10, fontSize: 20, marginBottom: 20 }}>
        {question}
      </Text>

      <View style={styles.container}>
        <View style={styles.newOption}>
          <Text>True</Text>
          <Text>{answers.t}</Text>
        </View>

        <View style={styles.newOption}>
          <Text>False</Text>
          <Text>{answers.f}</Text>
        </View>
      </View>
    </View>
  );
};

export default TrueFalseItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  newOption: {
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "flex-end",
    padding: 5,
    flex: 1,
  },
});
