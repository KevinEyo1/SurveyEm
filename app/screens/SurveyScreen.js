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
      getSurveys();
      getBookmarks();
    });
    return unsubscribe;
  }, [navigation]);

  // useEffect(() => {
  //   getBookmarkedSurveys();
  // }, [bookmarks]);

  const getSurveys = () => {
    const list = [];
    const surveyQuerySnapshot = getDocs(
      query(
        collection(db, "surveys"),
        where("uid", "!=", uid),
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
  };

  const getBookmarks = () => {
    const list = [];
    const bookmarkSnapshot = getDocs(
      collection(db, "users", uid, "bookmarkedSurveys")
    );
    bookmarkSnapshot.map((x) => {
      const survey = getDoc(doc(db, "surveys", x.data().bsid));
      survey.then((survey) => {
        if (survey.data().status == "Published") {
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
    });
    setBookmarkedItems(list);
    setBookLoaded(true);
    // bookmarkSnapshot
    //   .then((q) => {
    //     q.forEach((x) => {
    //       list.push({
    //         bsid: x.data().bsid,
    //       });
    //     });
    //     setBookmarks(list);
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
      <View>
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
            <SurveyItem
              key={survey.id}
              sid={survey.id}
              title={survey.title}
              tag={survey.tag}
              description={survey.description}
              coinsReward={survey.coinsReward}
              self={false}
              status={survey.status}
            ></SurveyItem>
          ))}
        {currentTab == 2 &&
          bookmarkedItems.length != 0 &&
          bookLoaded == true &&
          bookmarkedItems.map((survey) => (
            <SurveyItem
              key={survey.id}
              sid={survey.id}
              title={survey.title}
              tag={survey.tag}
              description={survey.description}
              coinsReward={survey.coinsReward}
              self={false}
              status={survey.status}
            ></SurveyItem>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SurveyScreen;
