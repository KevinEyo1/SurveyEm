import { StyleSheet, Text, View, TextInput } from "react-native";
import { React, useState } from "react";
import { RadioButton } from "react-native-paper";

function Content({ qtype }) {
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState("");
  const [tfChecked, setTfChecked] = useState("");

  if (qtype == "Open Ended") {
    return (
      <TextInput
        style={styles.input}
        placeholder="Answer"
        value={answer}
        onChangeText={(text) => setAnswer(text)}
      />
    );
  }

  if (qtype == "Agree Disagree") {
    return (
      <View style={styles.container}>
        <View style={styles.newOption}>
          <Text style={styles.text}>Strongly Disagree</Text>
          <RadioButton
            value="Strongly Agree"
            status={checked === "Strongly Agree" ? "checked" : "unchecked"}
            onPress={() => setChecked("Strongly Agree")}
          />
          <Text>1</Text>
        </View>

        <View style={styles.newOption}>
          <RadioButton
            value="Agree"
            status={checked === "Agree" ? "checked" : "unchecked"}
            onPress={() => setChecked("Agree")}
          />
          <Text>2</Text>
        </View>

        <View style={styles.newOption}>
          <RadioButton
            value="Neutral"
            status={checked === "Neutral" ? "checked" : "unchecked"}
            onPress={() => setChecked("Neutral")}
          />
          <Text>3</Text>
        </View>

        <View style={styles.newOption}>
          <RadioButton
            value="Disagree"
            status={checked === "Disagree" ? "checked" : "unchecked"}
            onPress={() => setChecked("Disagree")}
          />
          <Text>4</Text>
        </View>

        <View style={styles.newOption}>
          <Text style={styles.text}>Strongly Agree</Text>
          <RadioButton
            value="Strongly Disagree"
            status={checked === "Strongly Disagree" ? "checked" : "unchecked"}
            onPress={() => setChecked("Strongly Disagree")}
          />
          <Text>5</Text>
        </View>
      </View>
    );
  }
  if (qtype == "True False") {
    return (
      <View>
        <View style={styles.option}>
          <RadioButton
            value="True"
            status={tfChecked === "True" ? "checked" : "unchecked"}
            onPress={() => setTfChecked("True")}
          />
          <Text>True</Text>
        </View>

        <View style={styles.option}>
          <RadioButton
            value="False"
            status={tfChecked === "False" ? "checked" : "unchecked"}
            onPress={() => setTfChecked("False")}
          />
          <Text>False</Text>
        </View>
      </View>
    );
  }
}

const SurveyQuestionItem = ({ qtype, question }) => {
  return (
    <View>
      <Text style={{ padding: 10, fontSize: 20 }}>{question}</Text>

      <Content qtype={qtype} />
    </View>
  );
};

export default SurveyQuestionItem;

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
