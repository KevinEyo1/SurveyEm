import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Modal,
  Alert,
} from "react-native";
import { React, useState } from "react";

import SurveyQuestionItem from "../components/SurveyQuestionItem";
import { createSurveyData } from "../model/data";

var data = [];

const CreateSurveyQuestionsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [question1, setQuestion1] = useState("");

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalCenter}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textClose}>X</Text>
            </Pressable>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Question"
                value={question1}
                onChangeText={(text) => setQuestion1(text)}
                style={styles.input}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, styles.buttonAdd]}
              onPress={() => {
                if (question1.length == 0) {
                  Alert.alert("Input Question");
                }
                data.push(question1);
                console.log(data);
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Add Question</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {
          data = [];
          console.log(data);
        }}
      >
        <Text style={styles.textStyle}>Clear</Text>
      </Pressable>

      <View style={styles.inputContainer}>
        {true == true &&
          createSurveyData.map((item) => (
            <SurveyQuestionItem
              key={item.id}
              question={item.question}
              label={item.label}
            />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 22,
  },
  modalCenter: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {
    backgroundColor: "#E6E6E6",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
  },

  buttonAdd: {
    backgroundColor: "#C7755A",
    width: "60%",
    alignSelf: "center",
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: "#C7755A",
    width: "80%",
    alignSelf: "center",
  },
  buttonClose: {
    position: "absolute",
    right: 0,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textClose: {
    color: "black",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

// const [question1, setQuestion1] = useState("");
// const [answer1, setAnswer1] = useState("");

// const [question2, setQuestion2] = useState("");
// const [answer2, setAnswer2] = useState("");

// const [question3, setQuestion3] = useState("");
// const [answer3, setAnswer3] = useState("");

// return (
//   <KeyboardAvoidingView style={styles.container} behaviour="padding">
//     <View style={styles.inputContainer}>
//       <View>
//         <TextInput
//           placeholder="Question 1"
//           value={question1}
//           onChangeText={(text) => setQuestion1(text)}
//           style={styles.input}
//         />
//       </View>

//       <View>
//         <TextInput
//           placeholder="Answer"
//           value={answer1}
//           onChangeText={(text) => setAnswer1(text)}
//           style={styles.input}
//         />
//       </View>
//     </View>

//     <View style={styles.inputContainer}>
//       <View>
//         <TextInput
//           placeholder="Question 2"
//           value={question2}
//           onChangeText={(text) => setQuestion2(text)}
//           style={styles.input}
//         />
//       </View>

//       <View>
//         <TextInput
//           placeholder="Answer"
//           value={answer2}
//           onChangeText={(text) => setAnswer2(text)}
//           style={styles.input}
//         />
//       </View>
//     </View>

//     <View style={styles.inputContainer}>
//       <View>
//         <TextInput
//           placeholder="Question 3"
//           value={question3}
//           onChangeText={(text) => setQuestion3(text)}
//           style={styles.input}
//         />
//       </View>

//       <View>
//         <TextInput
//           placeholder="Answer"
//           value={answer3}
//           onChangeText={(text) => setAnswer3(text)}
//           style={styles.input}
//         />
//       </View>
//     </View>

//     <TouchableOpacity
//       // onPress={}
//       style={[styles.button]}
//     >
//       <Text style={styles.buttonText}>Create Survey</Text>
//     </TouchableOpacity>
//   </KeyboardAvoidingView>
// );

export default CreateSurveyQuestionsScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F6FCFC",
//   },
//   inputContainer: {
//     width: "80%",
//     marginTop: 30,
//   },
//   input: {
//     backgroundColor: "#E6E6E6",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 10,
//     marginTop: 5,
//   },
//   buttonContainer: {
//     width: "60%",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 40,
//   },
//   button: {
//     backgroundColor: "#0782F9",
//     width: "60%",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 80,
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "700",
//     fontSize: 16,
//   },
//   buttonOutline: {
//     backgroundColor: "white",
//     marginTop: 5,
//     marginBottom: 50,
//     borderColor: "#0782F9",
//     borderWidth: 2,
//   },
//   buttonOutlineText: {
//     color: "#0782F9",
//     fontWeight: "700",
//     fontSize: 16,
//   },
// });
