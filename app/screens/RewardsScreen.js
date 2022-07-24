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
    getCoins();
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
    const userQuery = getDoc(query(doc(db, "users", uid)));
    userQuery.then((user) => {
      setCoins(user.data().coins);
    });
  };

  // set user coins to new value and update user owned rewards
  const redeemUpdate = (coinsCost, title) => {
    if (coins < coinsCost) {
      Alert.alert("Not enough coins.");
    } else {
      const currentCoins = coins;
      setCoins(currentCoins - coinsCost);
      console.log(coins);

      const userRef = doc(db, "users", uid);
      updateDoc(userRef, {
        coins: coins,
        ownedRewards: arrayUnion(claimedReward),
      });
      setCoins(coins);
      Alert.alert("Reward claimed.");
      setClaimedReward({ title });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ padding: 10 }}>
        <View>
          <Text style={styles.coinText}>{coins}</Text>
        </View>
        <View>
          {rewardItems.length != 0 &&
            rewardItems.map((reward) => (
              <RewardsItem
                key={reward.id}
                title={reward.title}
                description={reward.description}
                coinsCost={reward.coinsCost}
                tnc={reward.tnc}
                redeem={() => redeemUpdate(reward.coinsCost, reward.title)}
                // claimed={reward.claimed}
              />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RewardsScreen;

const styles = StyleSheet.create({
  coinText: {
    backgroundColor: "lightgrey",
    fontSize: 20,
    alignSelf: "flex-end",
  },
});
