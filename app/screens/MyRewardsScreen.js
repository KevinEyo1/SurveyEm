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
  arrayRemove,
} from "firebase/firestore";
import { render } from "react-dom";
import { useRef } from "react";

const MyRewardsScreen = ({ navigation }) => {
  const [rewardItems, setRewardItems] = useState([]);
  const [changes, setChanges] = useState(true);
  const uid = auth.currentUser.uid;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getRewards();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getRewards();
  }, [changes]);

  const getRewards = async () => {
    const list = [];
    const rewardQuerySnapshot = getDocs(query(collection(db, "rewards")));
    const userRewards = await getDoc(doc(db, "users", uid));
    rewardQuerySnapshot
      .then((q) => {
        q.forEach((reward) => {
          if (userRewards.data().ownedRewards.includes(reward.id))
            list.push({
              id: reward.id,
              title: reward.data().title,
              description: reward.data().description,
              coinsCost: reward.data().coinsCost,
              tnc: reward.data().tnc,
            });
        });
        setRewardItems(list);
      })
      .catch((e) => alert(e.message));
  };

  // set user coins to new value and update user owned rewards
  const useReward = (coinsCost, id) => {
    const userRef = doc(db, "users", uid);
    updateDoc(userRef, {
      ownedRewards: arrayRemove(id),
    });
    setChanges(!changes);
    Alert.alert("Reward used.");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ padding: 20, paddingTop: 40 }}>
        <View>
          {rewardItems.length == 0 && <Text>No rewards owned.</Text>}
          {rewardItems.length != 0 &&
            rewardItems.map((reward) => (
              <RewardsItem
                key={reward.id}
                id={reward.id}
                title={reward.title}
                description={reward.description}
                coinsCost={reward.coinsCost}
                tnc={reward.tnc}
                redeemUpdate={useReward}
              />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyRewardsScreen;

const styles = StyleSheet.create({
  coinText: {
    backgroundColor: "lightgrey",
    fontSize: 20,
    alignSelf: "flex-end",
  },
});
