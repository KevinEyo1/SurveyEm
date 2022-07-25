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
  ActivityIndicator,
} from "react-native";

import SurveyItem from "../components/SurveyItem";
import ViewSurveyItem from "../components/ViewSurveyItem";
import CustomSwitch from "../components/CustomSwitch";

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
  limitToLast,
} from "firebase/firestore";
import { useTheme } from "react-native-paper";
import { async } from "@firebase/util";

const SurveyScreen = ({ navigation }) => {
  const [surveyItems, setSurveyItems] = useState([]);
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [bookLoaded, setBookLoaded] = useState(false);
  // switch between browse and bookmark
  const [currentTab, setCurrentTab] = useState(1);
  const uid = auth.currentUser.uid;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getBookmarks();
      getSurveys();
    });
    return unsubscribe;
  }, [navigation]);

  const getSurveys = async () => {
    const list = [];
    console.log("sqqssq");
    const surveyQuerySnapshot = await getDocs(
      query(
        collection(db, "surveys"),
        where("uid", "!=", uid),
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
        console.log(q.docs.length);
        if (q.docs.length == 0) {
          list.push({
            id: survey.id,
            title: survey.data().title,
            tag: survey.data().tag,
            description: survey.data().description,
            coinsReward: survey.data().coinsReward,
            status: survey.data().status,
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
  };

  const getBookmarks = async () => {
    const list = [];
    const bookmarkSnapshot = getDocs(
      collection(db, "users", uid, "bookmarkedSurveys")
    );
    bookmarkSnapshot.then((b) =>
      b.docs.map((x) => {
        const survey = getDoc(doc(db, "surveys", x.data().bsid));
        survey.then((survey) => {
          if (
            survey.data().status == "Published" &&
            x.data().submitted == false
          ) {
            list.push({
              id: survey.id,
              title: survey.data().title,
              tag: survey.data().tag,
              description: survey.data().description,
              coinsReward: survey.data().coinsReward,
              status: survey.data().status,
            });
          }
        });
      })
    );
    const delay = async (ms) => new Promise((res) => setTimeout(res, ms));
    await delay(2000);
    setBookmarkedItems(list);
    setBookLoaded(true);
    // bookmarkSnapshot.docs.map((d) => {

    //       list.push({
    //         bsid: x.data().bsid,
    //       });
    //     });
    //     setBookmarkedItems(list);
    //     setBookLoaded(true);
    //   })
    //   .catch((e) => alert(e.message));
  };

  // const getBookmarkedSurveys=()=>{

  // }

  const onSelectSwitch = (value) => {
    setCurrentTab(value);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 15, paddingBottom: 0 }}>
        <CustomSwitch
          selectionMode={1}
          option1="Browse Surveys"
          option2="Bookmarked Surveys"
          onSelectSwitch={onSelectSwitch}
        />
      </View>
      <ScrollView style={{ padding: 10 }}>
        {currentTab == 1 && surveyItems.length == 0 && loaded == true && (
          <Text>No surveys published by other users yet.</Text>
        )}
        {currentTab == 2 &&
          bookmarkedItems.length == 0 &&
          bookLoaded == true && <Text>No bookmarked surveys yet.</Text>}
        {currentTab == 1 &&
          surveyItems.length != 0 &&
          loaded == true &&
          surveyItems.map((survey) => (
            <ViewSurveyItem
              key={survey.id}
              sid={survey.id}
              title={survey.title}
              tag={survey.tag}
              description={survey.description}
              coinsReward={survey.coinsReward}
              self={false}
              status={survey.status}
            ></ViewSurveyItem>
          ))}
        {currentTab == 2 &&
          bookmarkedItems.length != 0 &&
          bookLoaded == true &&
          bookmarkedItems.map((survey) => (
            <ViewSurveyItem
              key={survey.id}
              sid={survey.id}
              title={survey.title}
              tag={survey.tag}
              description={survey.description}
              coinsReward={survey.coinsReward}
              self={false}
              status={survey.status}
            ></ViewSurveyItem>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SurveyScreen;
