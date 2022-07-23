import { React, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

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

function SurveyItem({
  sid,
  title,
  field,
  user,
  coinsReward,
  description,
  self,
  status,
}) {
  const navigation = useNavigation();
  const [bookmarked, setBookmarked] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getBookmarked();
  }, []);

  const getBookmarked = () => {
    setBookmarked(false);
    const surveys = getDocs(
      collection(db, "users", auth.currentUser.uid, "bookmarkedSurveys")
    );
    surveys.then((q) => {
      q.forEach((x) => {
        if (x.data().bsid == sid) {
          setBookmarked(true);
          setLoaded(true);
          return;
        }
      });
      setLoaded(true);
    });
  };

  // functions for surveys by user

  const editSurvey = () => {
    navigation.navigate("Edit Survey", {
      sid: sid,
      first: false,
    });
  };

  // const endSurvey = () => {
  //   const surveyRef = doc(db, "surveys", sid);
  //   updateDoc(surveyRef, { status: "Ended" });
  //   Alert.alert("Survey ended.");
  //   navigation.setParams({ status: "Ended" });
  //   setChange(change + 1);
  // };

  const viewResponses = () => {
    navigation.navigate("View Responses", { sid: sid, count: count });
  };

  // functions for surveys by other users

  const doSurvey = () => {
    const count = coinsReward / 100;
    navigation.navigate("DoSurveyQuestions", { sid: sid, count: count });
  };

  const bookmarkSurvey = () => {
    const count = coinsReward / 100;
    navigation.navigate("BookSurveyQuestions", { sid: sid, count: count });
  };

  const RenderButtons = () => {
    if (self) {
      if (status == "Unpublished") {
        return (
          <TouchableOpacity style={styles.buttonright} onPress={editSurvey}>
            <Text style={styles.buttonContent}>Edit Survey</Text>
          </TouchableOpacity>
        );
      }
      if (status == "Published") {
        return (
          <TouchableOpacity style={styles.buttonright} onPress={viewResponses}>
            <Text style={styles.buttonContent}>View Responses</Text>
          </TouchableOpacity>
        );
      }
      if (status == "Ended") {
        return (
          <TouchableOpacity style={styles.buttonright} onPress={viewResponses}>
            <Text style={styles.buttonContent}>View Responses</Text>
          </TouchableOpacity>
        );
      }
      return <Text>ERRORERRORERRORERRORERRORERROR</Text>;
    } else {
      // other user's surveys can only be accessed if status is "Published"
      // status == "Published"
      if (bookmarked) {
        return (
          <TouchableOpacity style={styles.buttonright} onPress={doSurvey}>
            <Text style={styles.buttonContent}>Do Survey</Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity style={styles.buttonright} onPress={bookmarkSurvey}>
            <Text style={styles.buttonContent}>Bookmark Survey</Text>
          </TouchableOpacity>
        );
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {loaded != true && <Text>Loading...</Text>}
      {loaded == true && (
        <View>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.field}>{field}</Text>

          <Text style={styles.posted}>Posted by: </Text>
          <Text style={styles.user}>{user}</Text>

          <Text style={styles.description}>{description}</Text>
          <RenderButtons />
          {self == true && <Text>{status}</Text>}

          <Text style={styles.coinsReward}>{coinsReward}</Text>
          {/* if bookmarked then display a star icon on top right of item */}
          {bookmarked == true && <Text>Bookmarked</Text>}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 314,
    height: 200,
    flex: 1,
    marginLeft: 25,
    borderWidth: 10,
    borderRadius: 30,
    borderColor: "white",
    backgroundColor: "#ADDBE6",
  },

  title: {
    padding: 30,
    marginTop: 5,
    fontSize: 16,
    fontFamily: "InknutAntiqua_700Bold",
  },
  field: {
    padding: 4,
    marginTop: 15,
    marginLeft: 10,
    position: "absolute",
    left: 0,
    borderRadius: 30,
    fontSize: 10,
    fontFamily: "OpenSans_700Bold",
    color: "white",
    backgroundColor: "#6D9CCF",
  },
  posted: {
    padding: 20,
    position: "absolute",
    bottom: 0,
    marginLeft: 15,
    fontSize: 10,
    fontFamily: "OpenSans_400Regular",
  },
  user: {
    padding: 20,
    position: "absolute",
    bottom: 0,
    marginLeft: 70,
    fontSize: 10,
    fontFamily: "OpenSans_400Regular_Italic",
  },
  description: {
    marginTop: 100,
    position: "absolute",
  },
  coinsReward: {
    padding: 30,
    marginTop: 45,
    position: "absolute",
    alignContent: "center",
    fontSize: 12,
  },
  buttonleft: {
    padding: 6,
    position: "absolute",
    left: 0,
    bottom: 0,
    marginBottom: 15,
    marginLeft: 20,
    borderRadius: 20,
    fontSize: 10,
    fontFamily: "OpenSans_700Bold",
    backgroundColor: "#C7755A",
  },
  buttonright: {
    padding: 6,
    position: "absolute",
    right: 0,
    bottom: 0,
    marginBottom: 15,
    marginRight: 20,
    borderRadius: 20,
    fontSize: 10,
    fontFamily: "OpenSans_700Bold",
    backgroundColor: "#C7755A",
  },
  buttonContent: {
    fontSize: 10,
    fontFamily: "OpenSans_700Bold",
    color: "white",
  },
});

export default SurveyItem;
