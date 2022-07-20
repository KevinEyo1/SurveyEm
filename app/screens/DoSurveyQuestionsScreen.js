import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import { React, useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import SurveyQuestionItem from "../components/SurveyQuestionItem";
import { auth, db } from "../../firebase";
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  increment,
} from "firebase/firestore";

const DoSurveyQuestionsScreen = ({ route, navigation }) => {
  const { sid } = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    getInitialQuestions();
  }, []);

  const getInitialQuestions = () => {
    const list = [];
    const iQuerySnapshot = getDocs(collection(db, "surveys", sid, "questions"));
    iQuerySnapshot
      .then((q) => {
        q.forEach((i) => {
          list.push({
            id: i.id,
            question: i.data().question,
            qtype: i.data().qtype,
          });
          // icr(idx + 1);
        });
        setData(list);
      })
      .catch((e) => alert(e.message));
  };

  const renderItem = ({ item }) => (
    <View>
      <SurveyQuestionItem
        qtype={item.qtype}
        question={item.question}
      ></SurveyQuestionItem>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          deleteQuestion(item);
        }}
      >
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: "lightblue",
        paddingBottom: 10,
        height: 0.5,
      }}
    />
  );

  const addQuestion = () => {
    console.log(data);
    if (question.length == 0) {
      Alert.alert("Missing Question");
    }
    if (qtype.length == 0) {
      Alert.alert("Missing question type");
    }
    if (question.length != 0 && qtype.length != 0) {
      // add to db
      const questionRef = doc(collection(db, "surveys", sid, "questions"));
      setDoc(questionRef, { question: question, qtype: qtype });
      const surveyRef = doc(db, "surveys", sid);
      updateDoc(surveyRef, { coinsReward: increment(100) });
      // add to flatlist
      var newArray = [
        ...data,
        { id: questionRef.id, question: question, qtype: qtype },
      ];
      // icr(idx + 1);
      setQuestion("");
      setQtype("");
      setData(newArray);
      setModalVisible(false);
    }
  };

  const deleteQuestion = (item) => {
    console.log("dele");
    // delete from db
    deleteDoc(doc(db, "surveys", sid, "questions", item.id));
    const surveyRef = doc(db, "surveys", sid);
    updateDoc(surveyRef, { coinsReward: increment(-100) });
    // delete from flatlist
    var tempArray = [...data];
    var index = tempArray.indexOf(item);
    if (index != -1) {
      tempArray.splice(index, 1);
    }
    setData(tempArray);
  };

  const finishEditing = () => {
    navigation.popToTop();
  };

  const publishSurvey = () => {
    const surveyRef = doc(db, "surveys", sid);
    if (data.length == 0) {
      Alert.alert(
        'No questions in survey yet, click "Edit Survey" to add questions.'
      );
    } else {
      updateDoc(surveyRef, { status: "Published" });
      Alert.alert("Survey published.");
      navigation.popToTop();
    }
  };

  return (
    <View style={styles.centeredView}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}
      />
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Add Question</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={finishEditing}
      >
        <Text style={styles.textStyle}>Finish Editing</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={publishSurvey}
      >
        <Text style={styles.textStyle}>Publish Survey</Text>
      </Pressable>
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

export default DoSurveyQuestionsScreen;
