import { React, useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";

import RewardsItem from "../components/RewardsItem";

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
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const UserRewardsScreen = () => {
  const [rewardItems, setRewardItems] = useState([]);
  const getRewards = () => {
    const list = [];
    // change to whatever variable we take the rewards from
    const rewardQuerySnapshot = getDocs(query(collection(db, "rewards")));
    rewardQuerySnapshot
      .then((q) => {
        q.forEach((reward) => {
          list.push({
            id: reward.id,
            title: reward.data().title,
            description: reward.data().description,
            coinsCost: reward.data().coinsCost,
            tnc: reward.data().tnc,
          });
        });
        setRewardItems(list);
        setLoaded(true);
      })
      .catch((e) => alert(e.message));
  };

  useEffect(() => {
    getRewards();
  }, []);

  return (
    <View>
      {rewardItems.map((rewards) => (
        <Text style={textStyle}>- {rewards}</Text>
      ))}
    </View>
  );
};

export default UserRewardsScreen;

const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});
