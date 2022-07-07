import { React, useState, useEffect } from "react";
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

import { useNavigation } from "@react-navigation/core";

import { auth, db } from "../../firebase";
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";

const CreateSurveyScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const uid = auth.currentUser.uid;

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = () => {
    const list = [];
    const projectQuerySnapshot = getDocs(collection(db, "projects"));
    projectQuerySnapshot
      .then((q) => {
        q.forEach((project) => {
          list.push({ label: project.data().title, value: project });
        });
        setItems(list);
        console.log(list);
      })
      .catch((e) => alert(e.message));
  };

  const navigation = useNavigation();
  const handleNext = () => {
    if (title == "" || selectedProject == null || description == "") {
      Alert.alert("Fields not completed");
    } else {
      const newSurveyRef = doc(collection(db, "surveys"));
      setDoc(newSurveyRef, {
        pid: selectedProject.id,
        title: title,
        tag: selectedProject.data().tag,
        description: description,
      }).catch((error) => alert(error.message));
      navigation.navigate("SurveyQuestions");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behaviour="padding">
      <View style={styles.inputContainer}>
        <DropDownPicker
          open={open}
          value={selectedProject}
          items={items}
          setOpen={setOpen}
          setValue={setSelectedProject}
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
          placeholder="Description (max 40 words)"
          maxLength={40}
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={styles.input}
        />

        <TouchableOpacity onPress={handleNext} style={[styles.button]}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateSurveyScreen;

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
