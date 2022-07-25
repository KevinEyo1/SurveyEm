import { React, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  getDoc,
} from "firebase/firestore";

const CreateProjectScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getTags();
  }, []);

  const getTags = () => {
    const list = [];
    const tagQuerySnapshot = getDocs(collection(db, "tags"));
    tagQuerySnapshot
      .then((q) => {
        q.forEach((tag) => {
          list.push({ label: tag.data().tag, value: tag.data().tag });
        });
        setItems(list);
      })
      .catch((e) => alert(e.message));
  };

  const handleCreatingProject = () => {
    if (title == "" || description == "" || tag == null) {
      Alert.alert("Missing fields.");
    } else {
      const user = getDoc(doc(db, "users", auth.currentUser.uid));
      user
        .then((q) => {
          addDoc(collection(db, "projects"), {
            userid: auth.currentUser.uid,
            title: title,
            tag: tag,
            description: description,
            username: q.data().username,
          }).catch((error) => alert(error.message));
          Alert.alert("Project created.");
          navigation.popToTop();
        })
        .catch((e) => alert(e.message));
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behaviour="padding">
      <View style={styles.inputContainer}>
        <DropDownPicker
          open={open}
          value={tag}
          items={items}
          setOpen={setOpen}
          setValue={setTag}
          setItems={setItems}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Description (max 100 characters)"
          maxLength={100}
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={styles.input}
        />

        <TouchableOpacity
          onPress={handleCreatingProject}
          style={[styles.button, styles.button]}
        >
          <Text style={styles.buttonText}>Create Project</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateProjectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6FCFC",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "#E6E6E6",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 80,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    marginBottom: 50,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
