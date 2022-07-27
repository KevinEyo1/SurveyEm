import { StyleSheet, Text, View } from "react-native";
import React from "react";

function ProjectCommentItem({ username, tagField, tagValue, comment }) {
  return (
    <View style={styles.container}>
      <View style={styles.userView}>
        <Text style={styles.user}>Posted by: {username}</Text>
        {tagField != null && (
          <View style={styles.tagContainer}>
            <Text style={styles.tag}>
              {tagField}: {tagValue}
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.comment}>{comment}</Text>
    </View>
  );
}

export default ProjectCommentItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgrey",
    padding: 10,
    borderWidth: 2,
    borderColor: "black",
    width: "100%",
    // alignSelf: "center",
  },
  user: {
    fontSize: 15,
    padding: 5,
  },

  tag: {
    fontSize: 15,
  },
  tagContainer: {
    top: 5,
    borderWidth: 1,
    right: -100,
  },

  comment: {
    fontSize: 15,
    textAlign: "justify",
    padding: 5,
  },

  userView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
  },
});
