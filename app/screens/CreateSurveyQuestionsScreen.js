import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { React, useState } from "react";

const CreateSurveyQuestionsScreen = () => {
  const [question1, setQuestion1] = useState("");
  const [answer1, setAnswer1] = useState("");

  const [question2, setQuestion2] = useState("");
  const [answer2, setAnswer2] = useState("");

  const [question3, setQuestion3] = useState("");
  const [answer3, setAnswer3] = useState("");

  return (
    <KeyboardAvoidingView style={styles.container} behaviour="padding">
      <View style={styles.inputContainer}>
        <View>
          <TextInput
            placeholder="Question 1"
            value={question1}
            onChangeText={(text) => setQuestion1(text)}
            style={styles.input}
          />
        </View>

        <View>
          <TextInput
            placeholder="Answer"
            value={answer1}
            onChangeText={(text) => setAnswer1(text)}
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View>
          <TextInput
            placeholder="Question 2"
            value={question2}
            onChangeText={(text) => setQuestion2(text)}
            style={styles.input}
          />
        </View>

        <View>
          <TextInput
            placeholder="Answer"
            value={answer2}
            onChangeText={(text) => setAnswer2(text)}
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View>
          <TextInput
            placeholder="Question 3"
            value={question3}
            onChangeText={(text) => setQuestion3(text)}
            style={styles.input}
          />
        </View>

        <View>
          <TextInput
            placeholder="Answer"
            value={answer3}
            onChangeText={(text) => setAnswer3(text)}
            style={styles.input}
          />
        </View>
      </View>

      <TouchableOpacity
        // onPress={}
        style={[styles.button]}
      >
        <Text style={styles.buttonText}>Create Survey</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default CreateSurveyQuestionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6FCFC",
  },
  inputContainer: {
    width: "80%",
    marginTop: 30,
  },
  input: {
    backgroundColor: "#E6E6E6",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 80,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    marginBottom: 50,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
