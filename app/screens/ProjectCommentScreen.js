import { React, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";

import ProjectCommentItem from "../components/ProjectCommentItem";
import { projectCommentsData } from "../model/data";
import { projectDescriptionData } from "../model/data";

import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  arrayUnion,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { auth } from "../../firebase";
import { async } from "@firebase/util";

const ProjectCommentScreen = ({ route, navigation }) => {
  const { pid, self, title, description, tag, user } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [change, setChange] = useState(false);

  useEffect(() => {
    getComments();
  }, [change]);

  const getComments = async () => {
    const list = [];
    const commentQuery = collection(db, "projects", pid, "comments");
    const commentQuerySnapshot = await getDocs(commentQuery);
    const userRef = doc(db, "users", uid);
    commentQuerySnapshot.forEach(async (comment) => {
      const commenter = await getDoc(doc(db, "users", comment.data().userID));
      const commenterDetails = commenter
        .data()
        .ownedTags.find((x) => x.tagField == tag);
      if (commenterDetails != undefined) {
        list.push({
          username: commenter.data().username,
          tagField: commenterDetails.tagField,
          tagValue: commenterDetails.tagValue,
          comment: comment.data().comment,
        });
      } else {
        list.push({
          username: commenter.data().username,
          tagField: null,
          tagValue: null,
          comment: comment.data().comment,
        });
      }
    });
    setAllComments(list);
  };

  const handleAddComment = async () => {
    if (comment == "") {
      Alert.alert("Please input a comment.");
    } else {
      const docRef = await addDoc(collection(db, "projects", pid, "comments"), {
        userID: auth.currentUser.uid,
        comment: comment,
      });
      setChange(!change);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* display top section, user, desc, tag, title
         */}
      </View>

      <View style={styles.add}>
        <TextInput
          placeholder="Add Comment"
          value={comment}
          onChangeText={(text) => setComment(text)}
          style={styles.input}
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddComment}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ padding: 10 }}>
        <View style={styles.container}>
          {true == true &&
            allComments.map((com) => (
              <ProjectCommentItem
                username={com.username}
                tagField={com.tagField}
                tagValue={com.tagValue}
                comment={com.comment}
              />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProjectCommentScreen;

const styles = StyleSheet.create({
  container: {
    width: "93%",
    height: "60%",
    backgroundColor: "lightgrey",
    alignSelf: "center",
    marginTop: 30,
  },

  add: {
    alignSelf: "center",
    flexDirection: "row",
    padding: 20,
  },

  addButton: {
    alignSelf: "flex-end",
  },

  addText: {
    fontSize: 35,
    marginLeft: 10,
    backgroundColor: "lightgrey",
    paddingLeft: 10,
    paddingRight: 10,
  },

  input: {
    backgroundColor: "lightgrey",
    width: "90%",
    padding: 10,
  },

  disclaimer: {
    textAlign: "center",
    fontSize: 12,
  },
});
