import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { React, useState, useEffect } from "react";

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
  arrayUnion,
} from "firebase/firestore";

const ProfileScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [ownedTags, setOwnedTags] = useState([]);
  const [username, setUsername] = useState("-");
  const [workplace, setWorkplace] = useState("");
  const [coins, setCoins] = useState(0);
  const [year, setYear] = useState(0);
  const [type, setType] = useState("");

  const uid = auth.currentUser.uid;

  useEffect(() => {
    getFirstName();
  }, []);

  function getFirstName() {
    const list = [];
    const userQuerySnapshot = getDoc(query(doc(db, "users", uid)));

    userQuerySnapshot
      .then((q) => {
        setFirstName(q.data().firstName);
        setOccupation(q.data().occupation);
        setLastName(q.data().lastName);
        setUsername(q.data().username);
        setCoins(q.data().coins);
        console.log(q.data().ownedTags);
        const arr = q.data().ownedTags.filter((x) => x.approved == true);
        setOwnedTags(arr);
      })
      .catch((e) => alert(e.message));
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Profile: </Text>
      {/* Names */}
      <View style={styles.fieldView}>
        <Text style={styles.titleSpace}>Username:</Text>
        <Text style={[styles.textSize, styles.nameContainer]}>{username}</Text>
      </View>
      <View style={styles.names}>
        <View style={styles.fieldView}>
          <Text style={styles.titleSpace}>First Name:</Text>
          <Text style={[styles.textSize, styles.nameContainer]}>
            {firstName}
          </Text>
        </View>

        <View style={[styles.lastName, styles.fieldView]}>
          <Text style={styles.titleSpace}>Last Name:</Text>
          <Text style={[styles.textSize, styles.nameContainer]}>
            {lastName}
          </Text>
        </View>
      </View>

      <View style={styles.fieldView}>
        <Text style={styles.titleSpace}>Occupation:</Text>
        <Text style={[styles.textSize, styles.nameContainer]}>
          {occupation}
        </Text>
      </View>

      <View style={styles.fieldView}>
        <Text style={styles.titleSpace}>Owned Tags: </Text>
        {ownedTags.length != 0 &&
          ownedTags.map((x) => (
            <View>
              <Text style={styles.tagStyle}>
                {x.tagField}: {x.tagValue}
              </Text>
            </View>
          ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        // onPress={() => navigation.popToTop().popToTop()}
        onPress={() => navigation.navigate("Home", { screen: "Home2" })}
      >
        <Text style={styles.buttonText}>Return to Home</Text>
      </TouchableOpacity>

      {/* Study fields */}
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    alignSelf: "center",
  },
  title: {
    fontSize: 30,
    marginBottom: 30,
    fontFamily: "OpenSans_700Bold",
  },
  names: {
    flexDirection: "row",
  },
  fields: {
    flexDirection: "column",
  },

  textSize: {
    fontSize: 18,
    fontFamily: "OpenSans_400Regular",
  },
  nameContainer: {
    backgroundColor: "lightgrey",
    width: 180,
    borderRadius: 30,
    padding: 5,
    marginBottom: 5,
  },
  lastName: {
    marginLeft: 10,
  },
  fieldView: {
    marginBottom: 15,
  },
  titleSpace: {
    marginBottom: 10,
    marginLeft: 7,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 50,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  tagStyle: {
    fontSize: 18,
    fontFamily: "OpenSans_700Bold",
  },
});
