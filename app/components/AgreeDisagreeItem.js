import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AgreeDisagreeItem = ({ question, sd, d, n, a, sa }) => {
  return (
    <View>
      <Text style={{ padding: 10, fontSize: 20, marginBottom: 20 }}>
        {question}
      </Text>

      <View style={styles.container}>
        <View style={styles.newOption}>
          <Text>SD</Text>
          <Text>{sd}</Text>
        </View>

        <View style={styles.newOption}>
          <Text>D</Text>
          <Text>{d}</Text>
        </View>

        <View style={styles.newOption}>
          <Text>N</Text>
          <Text>{n}</Text>
        </View>

        <View style={styles.newOption}>
          <Text>A</Text>
          <Text>{a}</Text>
        </View>

        <View style={styles.newOption}>
          <Text>SA</Text>
          <Text>{sa}</Text>
        </View>
      </View>
    </View>
  );
};

export default AgreeDisagreeItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  newOption: {
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "flex-end",
    padding: 5,
    flex: 1,
  },
});
