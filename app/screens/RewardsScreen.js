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
import { render } from "react-dom";
import { useRef } from "react";

const RewardsScreen = ({ navigation }) => {
  const [rewardItems, setRewardItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [coins, setCoins] = useState(0);
  const [claimedReward, setClaimedReward] = useState("");
  const uid = auth.currentUser.uid;

  useEffect(() => {
    getRewards();
  }, [coins]);

  const getRewards = () => {
    const list = [];
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

  // get initial user coins (either only call once, or call after every update to coins in db)
  const getCoins = () => {
    const coinsCount = getDoc(doc(db, "users", uid)).data().coins;
    setCoins(coinsCount);
  };

  // set user coins to new value and update user owned rewards
  const redeemUpdate = () => {
    // calc const newCount (leave to u to calc new updated coin count)
    const userRef = doc(db, "users", uid);
    updateDoc(userRef, {
      coins: newCount,
      ownedRewards: arrayUnion(claimedReward),
    });
    setCoins(newCount);
    Alert.alert("Reward claimed.");
    setClaimedReward("");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ padding: 10 }}>
        {/* view to display owned coins */}
        <View>
          {rewardItems.length != 0 &&
            rewardItems.map((reward) => (
              <RewardsItem
                key={reward.id}
                title={reward.title}
                description={reward.description}
                coinsCost={reward.coinsCost}
                // claimed={reward.claimed}
              ></RewardsItem>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RewardsScreen;
