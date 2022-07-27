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
import { FlatList } from "react-native-gesture-handler";

const ProjectCommentScreen = ({ route, navigation }) => {
  const { pid, self, title, description, tag, user } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [change, setChange] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getComments();
    });
    return unsubscribe;
  }, [navigation]);

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
      console.log(commenterDetails);
      if (commenterDetails != undefined) {
        list.push({
          id: comment.id,
          username: commenter.data().username,
          tagField: commenterDetails.tagField,
          tagValue: commenterDetails.tagValue,
          comment: comment.data().comment,
        });
      } else {
        list.push({
          id: comment.id,
          username: commenter.data().username,
          tagField: null,
          tagValue: null,
          comment: comment.data().comment,
        });
      }
      console.log(list);
    });
    const delay = async (ms) => new Promise((res) => setTimeout(res, ms));
    await delay(2000);
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
      Alert.alert("Comment posted.");
    }
  };

  const renderItem = ({ item }) => (
    <ProjectCommentItem
      key={item.id}
      username={item.username}
      tagField={item.tagField}
      tagValue={item.tagValue}
      comment={item.comment}
    />
  );

  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: "lightblue",
        paddingBottom: 10,
        height: 0.5,
        borderColor: "black",
        borderLeftWidth: 2,
        borderRightWidth: 2,
      }}
    />
  );

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
        <Text style={styles.tag}>{tag}</Text>
        <View style={styles.contentView}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.userView}>
          <Text style={styles.user}>Posted by: {user}</Text>
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

      <FlatList
        data={allComments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}
        style={styles.commentContainer}
      />
    </SafeAreaView>
  );
};

export default ProjectCommentScreen;

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  container: {
    width: "93%",
    height: 200,
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
    marginLeft: 20,
  },
  tag: {
    alignSelf: "flex-end",
    padding: 5,
    backgroundColor: "white",
    borderRadius: 30,
    marginRight: 10,
    marginTop: 10,
    fontFamily: "OpenSans_700Bold",
  },
  bottomContent: {
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
  },
  commentContainer: {
    backgroundColor: "white",
    width: "100%",
    padding: 10,
  },
});
