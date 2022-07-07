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
  query,
  where,
} from "firebase/firestore";
import { render } from "react-dom";

const ProjectScreen = () => {
  const [projectItems, setProjectItems] = useState([]);
  const uid = auth.currentUser.uid;

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = () => {
    const list = [];
    const otherProjectsQuery = query(
      collection(db, "projects"),
      where("uid", "!=", uid)
    );
    const projectQuerySnapshot = getDocs(otherProjectsQuery);
    projectQuerySnapshot
      .then((q) => {
        q.forEach((project) => {
          const user = getDoc(doc(db, "users", project.data().uid));
          list.push({
            key: project.id,
            title: project.data().title,
            tag: project.data().tag,
            user: user.data().username,
          });
        });
      })
      .catch((e) => alert(e.message));
    list.forEach((project) => (
      <ProjectItem
        key={project.key}
        title={project.title}
        tag={project.tag}
        user={project.user}
      />
    ));
    setProjectItems(list);
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
