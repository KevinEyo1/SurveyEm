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

const ViewResponsesScreen = ({ route, navigation }) => {
  const { sid, count } = route.params;
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
          // if any of 3 states then add to list accordingly (can array store different items?)
          const qt = i.data().qtype;
          if (qt == "Open Ended") {
            list.push({
              id: i.id,
              question: i.data().question,
              qtype: qt,
              responses: i.data().responses,
            });
          } else if (qt == "Agree Disagree") {
            list.push({
              id: i.id,
              question: i.data().question,
              qtype: qt,
              sd: i.data().sd,
              d: i.data().d,
              n: i.data().n,
              a: i.data().a,
              sa: i.data().sa,
            });
          } else if (qt == "True False") {
            list.push({
              id: i.id,
              question: i.data().question,
              qtype: qt,
              trueCount: i.data().trueCount,
              falseCount: i.data().falseCount,
            });
          }
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
      {/* {item.qtype == "Open Ended" && (
        <OEResultsItem responses={item.responses} />
      )}
      {item.qtype == "Agree Disagree" && (
        <ADResultsItem
          sd={item.sd}
          d={item.d}
          n={item.n}
          a={item.a}
          sa={item.sa}
        />
      )}
      {item.qtype == "True False" && (
        <TFResultsItem
          trueCount={item.trueCount}
          falseCount={item.falseCount}
        />
      )} */}
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

  const endSurvey = () => {
    const surveyRef = doc(db, "surveys", sid);
    updateDoc(surveyRef, { published: "Ended" });
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
      <Pressable style={[styles.button, styles.buttonOpen]} onPress={endSurvey}>
        <Text style={styles.textStyle}>End Survey</Text>
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

export default ViewResponsesScreen;
