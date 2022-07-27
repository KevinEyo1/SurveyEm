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
import { auth, db } from "../../firebase";
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
    commentQuerySnapshot.forEach(async (comment) => {
      const commenter = await getDoc(doc(db, "users", comment.data().userID));
      const commenterDetails = commenter
        .data()
        .ownedTags.find((x) => x.tagField == tag && x.approved == true);
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
        {/* user, desc, tag, title
         */}
        <View style={styles.contentView}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.userView}>
          <Text style={styles.user}>{user}</Text>
          <Text style={styles.tag}>{tag}</Text>
        </View>
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

  title: {
    fontSize: 20,
    fontFamily: "InknutAntiqua_700Bold",
    width: "100%",
  },

  description: {
    fontSize: 16,
  },

  contentView: {
    alignItems: "baseline",
    padding: 12,
    marginTop: 25,
    marginLeft: 20,
    marginBottom: 30,
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

  userView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
  },

  user: {
    marginLeft: 10,
  },
  tag: {
    marginLeft: 95,
  },
  bottomContent: {
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
  },
});
