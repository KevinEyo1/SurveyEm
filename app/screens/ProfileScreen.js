import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
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

const ProfileScreen = () => {
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
      {/* Names */}
      <Text>{username}</Text>
      <View style={styles.names}>
        <View>
          <Text style={styles.title}>First Name:</Text>
          <TextInput style={styles.firstName}>{firstName}</TextInput>
        </View>

        <View style={styles.field}>
          <Text style={styles.title}>Last Name:</Text>
          <Text style={styles.lastName}>{lastName}</Text>
        </View>
        <View>
          {ownedTags.length != 0 &&
            ownedTags.map((x) => (
              <View>
                <Text>{x.tagField}</Text>
                <Text>{x.tagValue}</Text>
              </View>
            ))}
        </View>
      </View>

      {/* Study fields */}
      <View>
        <Text>{occupation}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  names: {
    flexDirection: "row",
  },
  fields: {
    flexDirection: "column",
  },
  firstName: {
    flex: 1,
    fontSize: 20,
    // backgroundColor: "lightgrey",
    padding: 10,
    width: 180,
  },
  lastName: {
    flex: 1,
    fontSize: 20,
    // backgroundColor: "lightgrey",
    padding: 10,
    marginLeft: 10,
  },
});
