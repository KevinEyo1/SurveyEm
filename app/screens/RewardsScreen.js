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
  const uid = auth.currentUser.uid;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getRewards();
      getCoins();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getRewards();
    getCoins();
  }, [coins]);

  const getRewards = async () => {
    const list = [];
    const rewardQuerySnapshot = getDocs(query(collection(db, "rewards")));
    const userRewards = await getDoc(doc(db, "users", uid));
    rewardQuerySnapshot
      .then((q) => {
        q.forEach((reward) => {
          if (!userRewards.data().ownedRewards.includes(reward.id))
            list.push({
              id: reward.id,
              title: reward.data().title,
              description: reward.data().description,
              coinsCost: reward.data().coinsCost,
              tnc: reward.data().tnc,
            });
          console.log(reward.data().tnc);
        });
        setRewardItems(list);
        setLoaded(true);
      })
      .catch((e) => alert(e.message));
  };

  // get initial user coins (either only call once, or call after every update to coins in db)
  const getCoins = () => {
    const coinsRef = getDoc(doc(db, "users", uid));
    coinsRef.then((q) => {
      setCoins(q.data().coins);
    });
  };

  // set user coins to new value and update user owned rewards
  const redeemUpdate = (coinsCost, id) => {
    if (coins < coinsCost) {
      Alert.alert("Not enough coins.");
    } else {
      const newCoins = coins - coinsCost;
      setCoins(newCoins);
      console.log(coins);

      const userRef = doc(db, "users", uid);
      updateDoc(userRef, {
        coins: newCoins,
        ownedRewards: arrayUnion(id),
      });
      Alert.alert("Reward claimed.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ padding: 10 }}>
        <View>
          <Text style={styles.coinText}>Available coins: {coins}</Text>
        </View>
        <View>
          {rewardItems.length == 0 && <Text>No more rewards to redeem.</Text>}
          {rewardItems.length != 0 &&
            rewardItems.map((reward) => (
              <RewardsItem
                key={reward.id}
                id={reward.id}
                title={reward.title}
                description={reward.description}
                coinsCost={reward.coinsCost}
                tnc={reward.tnc}
                redeemUpdate={redeemUpdate}
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
    fontSize: 16,
    alignSelf: "flex-end",
    marginBottom: 20,
    marginRight: 10,
    fontFamily: "OpenSans_700Bold",
    padding: 10,
    borderRadius: 20,
  },
});
