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
import { React, useState } from "react";

import ProjectCommentItem from "../components/ProjectCommentItem";
import { projectCommentsData } from "../model/data";
import { projectDescriptionData } from "../model/data";

import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const ProjectCommentScreen = () => {
  const [comment, setComment] = useState("");
  const [user, setUser] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [description, setDescription] = useState("");

  const handleAddComment = () => {
    if (comment == "") {
      Alert.alert("Please input a comment");
    } else {
      const newCommentRef = doc();
      // collection(db, "users", uid, "projects", selectedProject, "surveys")
      setDoc(newCommentRef, {
        user: user,
        comment: comment,
      }).catch((error) => alert(error.message));
    }
  };

  const getDescription = () => {
    const list = [];

    // const descriptionQuerySnapshot =
    // getDocs(collection(db, "tags"));

    descriptionQuerySnapshot
      .then((q) => {
        q.forEach((description) => {
          list.push({
            label: description.data().description,
            value: description.data().description,
          });
        });
        setDescription(list);
        console.log(list);
      })
      .catch((e) => alert(e.message));
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>{/* Project Description  */}</View>

      <View style={styles.add}>
        {/* Add Comments */}
        <TextInput
          placeholder="Add Comment"
          value={comment}
          onChangeText={(text) => setComment(text)}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.addButton}
          // onPress={handleAddComment}
        >
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* All Comments */}
      {/* <ScrollView style={{ padding: 10 }}>
        <View style={styles.container}>
          {true == true &&
            projectCommentsData.map((item) => (
              <ProjectCommentItem
                key={item.id}
                user={item.user}
                comment={item.comment}
              />
            ))}
        </View>
      </ScrollView> */}
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
});
