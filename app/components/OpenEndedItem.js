import { StyleSheet, Text, View } from "react-native";
import React from "react";

const OpenEndedItem = ({ question, answers }) => {
  const responses = answers.map((response) => (
    <Text style={{ marginBottom: 10 }}>{response}</Text>
  ));
  return (
    <View>
      <Text style={{ padding: 10, fontSize: 20, marginBottom: 20 }}>
        {question}
      </Text>
      <View>{responses}</View>
    </View>
  );
};

export default OpenEndedItem;

const styles = StyleSheet.create({});
