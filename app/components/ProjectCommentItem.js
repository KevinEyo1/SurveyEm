import { StyleSheet, Text, View } from "react-native";
import React from "react";

function ProjectCommentItem({ user, tagField, tagValue, comment }) {
  return (
    <View style={styles.container}>
      <View style={styles.userView}>
        <Text style={styles.user}>Posted by: {user}</Text>
        {tagField != null && (
          <View>
            {/* insert tagfield and tagvalue */}
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
    // alignSelf: "center",
  },
  user: {
    fontSize: 10,
    padding: 5,
  },

  tag: {
    fontSize: 10,
  },

  comment: {
    fontSize: 12,
    textAlign: "justify",
    padding: 5,
  },

  userView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
  },
});
