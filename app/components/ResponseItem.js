import { StyleSheet, Text, View, TextInput } from "react-native";
import { React, useState } from "react";
import { RadioButton } from "react-native-paper";

function Response({ qtype, answers }) {
  if (qtype == "Open Ended") {
    const responses = answers.map((response) => <Text>{response}</Text>);

    return (
      <View>
        <Text style={styles.input}>{responses}</Text>
      </View>
    );
  }

  if (qtype == "Agree Disagree") {
    return (
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
    );
  }
  if (qtype == "True False") {
    return (
      <View>
        <View style={styles.option}>
          <Text>True</Text>
          <Text>{answers.t}</Text>
        </View>

        <View style={styles.option}>
          <Text>False</Text>
          <Text>{answers.f}</Text>
        </View>
      </View>
    );
  }
}

const ResponseItem = ({ qtype, question, answers }) => {
  return (
    <View>
      <Text style={{ padding: 10, fontSize: 20 }}>{question}</Text>

      <Response qtype={qtype} answers={answers} />
    </View>
  );
};

export default ResponseItem;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#E6E6E6",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
  },

  newOption: {
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "flex-end",
    padding: 5,
    flex: 1,
  },

  text: {
    textAlign: "center",
  },

  container: {
    flexDirection: "row",
  },
});
