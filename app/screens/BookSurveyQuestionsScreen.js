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

const BookSurveyQuestionsScreen = ({ route, navigation }) => {
  const { sid, count } = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    getInitialQuestions();
    getQtypes();
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

  const bookmarkSurvey = () => {
    const answers = Array.apply(null, Array(count));
    console.log(answers);
    const docRef = addDoc(
      collection(db, "users", auth.currentUser.uid, "bookmarkedSurveys"),
      {
        bsid: sid,
        submitted: false,
        surveyObj: { questions: count, answers: answers },
      }
    );
    Alert.alert(
      "Survey Bookmarked. Go to Survey Page to see your bookmarked surveys."
    );
    navigation.popToTop();
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
        onPress={bookmarkSurvey}
      >
        <Text style={styles.textStyle}>Bookmark Survey</Text>
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

export default BookSurveyQuestionsScreen;
