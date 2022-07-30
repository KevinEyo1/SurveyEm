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
  Alert,
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
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

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

  const getSurveys = async () => {
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
      const surveyQuerySnapshot = await getDocs(
        query(
          collection(db, "surveys"),
          where("pid", "==", pid),
          where("status", "==", "Published")
        )
      );
      const bmRef = collection(
        db,
        "users",
        auth.currentUser.uid,
        "bookmarkedSurveys"
      );

      const result = surveyQuerySnapshot.docs.map((survey) => {
        const q = query(bmRef, where("bsid", "==", survey.id));
        const qSnap = getDocs(q);
        qSnap.then((q) => {
          // to display, survey must not be both in bookmarked and submitted set as true
          // not bookmarked AND not submitted
          console.log(q.docs[0]);
          if (q.docs.length == 0) {
            list.push({
              id: survey.id,
              title: survey.data().title,
              tag: survey.data().tag,
              description: survey.data().description,
              coinsReward: survey.data().coinsReward,
              status: survey.data().status,
              username: survey.data().username,
            });
          } else if (q.docs.length != 0) {
            q.docs.forEach((p) => {
              if (p.data().submitted == false) {
                list.push({
                  id: survey.id,
                  title: survey.data().title,
                  tag: survey.data().tag,
                  description: survey.data().description,
                  coinsReward: survey.data().coinsReward,
                  status: survey.data().status,
                  username: survey.data().username,
                });
              }
            });
          }
        });
      });
      const delay = async (ms) => new Promise((res) => setTimeout(res, ms));
      await delay(2000);
      setSurveyItems(list);
      setLoaded(true);
      // surveyQuerySnapshot
      //   .then((q) => {
      //     q.forEach((survey) => {
      //       list.push({
      //         id: survey.id,
      //         title: survey.data().title,
      //         tag: survey.data().tag,
      //         description: survey.data().description,
      //         coinsReward: survey.data().coinsReward,
      //         status: survey.data().status,
      //       });
      //     });
      //     setSurveyItems(list);
      //     setLoaded(true);
      //   })
      //   .catch((e) => alert(e.message));
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
            <View>
              <Text>No surveys published by other users yet.</Text>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.textStyle}>Go Back</Text>
              </Pressable>
            </View>
          )}
          {surveyItems.length != 0 &&
            surveyItems.map((survey) => (
              <SurveyItem
                key={survey.id}
                sid={survey.id}
                title={survey.title}
                field={survey.tag}
                description={survey.description}
                coinsReward={survey.coinsReward}
                self={self}
                status={survey.status}
                user={survey.username}
              ></SurveyItem>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SingleProjectSurveyScreen;
