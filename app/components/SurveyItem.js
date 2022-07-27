import { React, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
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
    navigation.navigate("View Responses", { sid: sid, status: status });
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
          <TouchableOpacity style={styles.buttonBookmark} onPress={doSurvey}>
            <Text style={styles.bookmarkContent}>Do Survey</Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            style={styles.buttonBookmark}
            onPress={bookmarkSurvey}
          >
            <Text style={styles.bookmarkContent}>Bookmark Survey</Text>
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
          <View style={styles.contentView}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>

          <Text style={styles.field}>{field}</Text>

          <Text style={styles.posted}>Posted by: {user}</Text>

          <Text style={styles.coinsReward}>{coinsReward} coins</Text>
          {/* if bookmarked then display a star icon on top right of item */}
          {bookmarked == true && (
            <Image
              source={require("../assets/star.png")}
              style={styles.image}
            />
          )}

          <View>
            {self == true && <Text style={styles.status}>{status}</Text>}
            <RenderButtons />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 314,
    height: 200,
    marginLeft: 25,
    borderWidth: 10,
    borderRadius: 30,
    borderColor: "white",
    backgroundColor: "#ADDBE6",
  },
  contentView: {
    alignItems: "baseline",
    marginTop: 25,
    marginLeft: 20,
    marginBottom: 15,
  },

  title: {
    marginTop: 7,
    fontSize: 16,
    fontFamily: "InknutAntiqua_700Bold",
  },
  field: {
    padding: 4,
    marginTop: 10,
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
    marginLeft: 20,
    marginBottom: 5,
    fontSize: 10,
    fontFamily: "OpenSans_400Regular",
  },
  user: {
    marginLeft: 70,
    fontSize: 10,
    fontFamily: "OpenSans_400Regular_Italic",
  },
  description: {
    fontSize: 12,
  },
  coinsReward: {
    padding: 15,
    position: "absolute",
    bottom: -10,
    left: 0,
    fontSize: 12,
    fontFamily: "OpenSans_700Bold",
  },

  buttonright: {
    padding: 5,
    width: "40%",
    alignSelf: "flex-end",
    marginLeft: 60,
    borderRadius: 20,
    fontSize: 10,
    fontFamily: "OpenSans_700Bold",
    backgroundColor: "#C7755A",
  },
  buttonContent: {
    fontSize: 10,
    fontFamily: "OpenSans_700Bold",
    color: "white",
    textAlign: "center",
  },

  status: {
    marginTop: 2,
    marginLeft: 200,
    width: 80,
    fontSize: 13,
    fontFamily: "OpenSans_400Regular_Italic",
  },

  bottomView: {
    flexDirection: "row",
    marginTop: 5,
    padding: 5,
  },

  image: {
    flex: 1,
    width: 10,
    height: 10,
    padding: 20,
    marginRight: 10,
    marginTop: 10,
    position: "absolute",
    top: 0,
    right: 0,
  },

  buttonBookmark: {
    padding: 5,
    width: "40%",
    // position: "absolute",
    marginLeft: 150,
    borderRadius: 20,
    fontSize: 10,
    fontFamily: "OpenSans_700Bold",
    backgroundColor: "#C7755A",
  },
  bookmarkContent: {
    fontSize: 10,
    fontFamily: "OpenSans_700Bold",
    color: "white",
    textAlign: "center",
  },
});

export default SurveyItem;
