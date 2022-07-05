import { React, useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { projectData } from "../model/data";
import ProjectItem from "../components/ProjectItem";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { render } from "react-dom";

const ProjectScreen = () => {
  const [projectItems, setProjectItems] = useState([]);
  const uid = auth.currentUser.uid;

  useEffect(() => {
    getProjects();
  });

  const getProjects = () => {
    const list = [];
    const projectQuerySnapshot = getDocs(
      collection(db, "users", uid, "projects")
    );
    projectQuerySnapshot
      .then((q) => {
        q.forEach((project) => {
          list.push(
            <ProjectItem
              key={project.id}
              title={project.data().title}
              field={project.data().field}
              user={auth.currentUser.email}
            />
          );
        });
        setProjectItems(list);
      })
      .catch((e) => alert(e.message));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ padding: 10 }}>
        <View>{projectItems}</View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProjectScreen;
