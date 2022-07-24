import { React, useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

import SurveyItem from "../components/SurveyItem";

import { onAuthStateChanged } from "firebase/auth";
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
} from "firebase/firestore";

const SingleProjectSurveyScreen = ({ route, navigation }) => {
  const { pid, self } = route.params;
  const [surveyItems, setSurveyItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getSurveys();
    });
    return unsubscribe;
  }, [navigation]);

  const getSurveys = () => {
    const list = [];
    if (self) {
      const surveyQuerySnapshot = getDocs(
        query(collection(db, "surveys"), where("pid", "==", pid))
      );
      surveyQuerySnapshot
        .then((q) => {
          q.forEach((survey) => {
            list.push({
              id: survey.id,
              title: survey.data().title,
              tag: survey.data().tag,
              description: survey.data().description,
              coinsReward: survey.data().coinsReward,
              status: survey.data().status,
            });
          });
          setSurveyItems(list);
          setLoaded(true);
        })
        .catch((e) => alert(e.message));
    } else {
      const surveyQuerySnapshot = getDocs(
        query(
          collection(db, "surveys"),
          where("pid", "==", pid),
          where("status", "==", "Published")
        )
      );
      surveyQuerySnapshot
        .then((q) => {
          q.forEach((survey) => {
            list.push({
              id: survey.id,
              title: survey.data().title,
              tag: survey.data().tag,
              description: survey.data().description,
              coinsReward: survey.data().coinsReward,
              status: survey.data().status,
            });
          });
          setSurveyItems(list);
          setLoaded(true);
        })
        .catch((e) => alert(e.message));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ padding: 10 }}>
        <View>
          {surveyItems.length == 0 && loaded == true && self == true && (
            <Text>No surveys created yet.</Text>
          )}
          {surveyItems.length == 0 && loaded == true && self == false && (
            <Text>No surveys published by other users yet.</Text>
          )}
          {surveyItems.length != 0 &&
            surveyItems.map((survey) => (
              <SurveyItem
                key={survey.id}
                sid={survey.id}
                title={survey.title}
                tag={survey.tag}
                description={survey.description}
                coinsReward={survey.coinsReward}
                self={self}
                status={survey.status}
              ></SurveyItem>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleProjectSurveyScreen;
