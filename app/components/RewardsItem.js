import React from "react";
import { Text, View, SafeAreaView, StyleSheet, Image } from "react-native";

function RewardsItem({ title, image, pointCosts }) {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={image} resizeMode="center"></Image>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.pointCosts}>{pointCosts}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 10,
    borderColor: "white",
    backgroundColor: "lightblue",
    height: 150,
  },
  title: { padding: 20, position: "absolute", bottom: 0, height: "50%" },
  image: { height: "50%", right: "50%" },
  pointCosts: {
    padding: 20,
    position: "absolute",
    right: 0,
    bottom: 0,
    height: "50%",
  },
});

export default RewardsItem;
