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

import DoSurveyQuestionItem from "../components/DoSurveyQuestionItem";
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
  arrayUnion,
} from "firebase/firestore";

const DoSurveyQuestionsScreen = ({ route, navigation }) => {
  const { sid, count } = route.params;
  const [data, setData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [answerID, setAnswerID] = useState([]);

  useEffect(() => {
    getEmptyArray();
    getInitialQuestions();
  }, []);

  const getInitialQuestions = () => {
    const list = [];
    const idlist = [];
    const iQuerySnapshot = getDocs(collection(db, "surveys", sid, "questions"));
    iQuerySnapshot
      .then((q) => {
        var ind = 0;
        q.forEach((i) => {
          list.push({
            id: i.id,
            question: i.data().question,
            qtype: i.data().qtype,
            index: ind,
          });
          var newArray = answerID;
          newArray[ind] = { id: i.id, qtype: i.data().qtype };
          setAnswerID(newArray);
          ind = ind + 1;
        });
        setData(list);
      })
      .catch((e) => alert(e.message));
  };

  const getEmptyArray = () => {
    const ans = Array.apply(null, Array(count));
    console.log(ans);
    setAnswers(ans);
    const anss = Array.apply(null, Array(count));
    setAnswerID(anss);
  };

  const updateAnswers = (value, index) => {
    var newArray = answers;
    newArray[index] = value;
    setAnswers(newArray);
    console.log(answers);
  };

  const renderItem = ({ item }) => (
    <View>
      <DoSurveyQuestionItem
        qtype={item.qtype}
        question={item.question}
        updateAnswers={updateAnswers}
        index={item.index}
      ></DoSurveyQuestionItem>
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

  const submitSurvey = () => {
    var filled = true;
    answers.map((x) => {
      if (x == null || x == "") {
        filled = false;
      }
    });
    if (filled) {
      var count = 0;
      console.log(answerID);
      answerID.forEach((question) => {
        const val = answers[count];
        const qRef = doc(db, "surveys", sid, "questions", question.id);
        if (question.qtype == "Open Ended") {
          updateDoc(qRef, { responses: arrayUnion(val) });
        } else if (question.qtype == "Agree Disagree") {
          if (val == "1") {
            updateDoc(qRef, { sd: increment(1) });
          } else if (val == "2") {
            updateDoc(qRef, { d: increment(1) });
          } else if (val == "3") {
            updateDoc(qRef, { n: increment(1) });
          } else if (val == "4") {
            updateDoc(qRef, { a: increment(1) });
          } else if (val == "5") {
            updateDoc(qRef, { sa: increment(1) });
          }
        } else if (question.qtype == "True False") {
          if (val == true) {
            updateDoc(qRef, { trueCount: increment(1) });
          } else if (val == false) {
            updateDoc(qRef, { falseCount: increment(1) });
          }
        }
        count = count + 1;
      });
      const coins = count * 100;
      const userRef = doc(db, "users", auth.currentUser.uid);
      updateDoc(userRef, { coins: increment(coins) });

      // set bookmark as submitted
      const bmRef = collection(
        db,
        "users",
        auth.currentUser.uid,
        "bookmarkedSurveys"
      );
      const q = query(bmRef, where("bsid", "==", sid));
      const qSnap = getDocs(q);
      qSnap.then((q) => {
        q.forEach((x) => {
          updateDoc(x.ref, { submitted: true });
        });
      });

      Alert.alert("Survey answers submitted, coins rewarded!");
      navigation.popToTop();
    } else {
      Alert.alert("Not all questions answered. Please answer them.");
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
        onPress={submitSurvey}
      >
        <Text style={styles.textStyle}>Submit Survey</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.textStyle}>Back to Surveys</Text>
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
