import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AgreeDisagreeItem = ({ question, answers }) => {
  return (
    <View>
      <Text style={{ padding: 10, fontSize: 20, marginBottom: 20 }}>
        {question}
      </Text>

      <View style={styles.container}>
        <View style={styles.newOption}>
          <Text style={styles.text}>Strongly Disagree</Text>
          <Text>1</Text>
          <Text>{answers.sd}</Text>
        </View>

        <View style={styles.newOption}>
          <Text>2</Text>
          <Text>{answers.d}</Text>
        </View>

        <View style={styles.newOption}>
          <Text>3</Text>
          <Text>{answers.n}</Text>
        </View>

        <View style={styles.newOption}>
          <Text>4</Text>
          <Text>{answers.a}</Text>
        </View>

        <View style={styles.newOption}>
          <Text style={styles.text}>Strongly Agree</Text>

          <Text>5</Text>
          <Text>{answers.sa}</Text>
        </View>
      </View>
    </View>
  );
};

export default AgreeDisagreeItem;

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
