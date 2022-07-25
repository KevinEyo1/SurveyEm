import { StyleSheet, Text, View } from "react-native";
import React from "react";

function ProjectCommentItem({ user, tagField, tagValue, comment }) {
  return (
    <View style={styles.container}>
      <Text style={styles.user}>{user}</Text>
      {tagField != null && <View>{/* insert tagfield and tagvalue */}</View>}
      <Text style={styles.comment}>{comment}</Text>
    </View>
  );
}

export default ProjectCommentItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgrey",
    padding: 10,
    alignSelf: "center",
  },
  user: {
    fontSize: 10,
    left: 0,
    padding: 5,
  },

  comment: {
    fontSize: 20,
    textAlign: "justify",
    padding: 5,
  },
});
