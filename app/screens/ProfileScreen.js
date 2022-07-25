import { StyleSheet, Text, View } from "react-native";
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
  const [tagAppl, setTagAppl] = useState([]);
  const [approved, setApproved] = useState(false);
  const [edu, setEdu] = useState(0);
  const [field, setField] = useState("-");
  const [year, setYear] = useState(0);
  const [username, setUsername] = useState("");

  const uid = auth.currentUser.uid;

  useEffect(() => {
    getInfo();
  });

  function getInfo() {
    const infoQuerySnapshot = getDocs(query(document(db, "users", uid)));

    setFirstName(infoQuerySnapshot.data().firstName);
    setLastName(infoQuerySnapshot.data().lastName);
    setOccupation(infoQuerySnapshot.data().occupation);
    setTagAppl(infoQuerySnapshot.data().tagApplications);
    setApproved(tagAppl[0].approved);

    if (approved) {
    }
  }

  return (
    <View>
      {/* Names */}
      <Text>{username}</Text>
      <View>
        <Text>{firstName}</Text>
        <Text>{lastName}</Text>
      </View>

      {/* Study fields */}
      <View>
        <Text>{occupation}</Text>
        <Text>{edu}</Text>
        <Text>{year}</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
