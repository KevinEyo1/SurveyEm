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

const ProjectScreen = ({ navigation }) => {
  const [projectItems, setProjectItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const uid = auth.currentUser.uid;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getProjects();
    });
    return unsubscribe;
  }, [navigation]);

  const getProjects = () => {
    const list = [];
    const otherProjectsQuery = query(
      collection(db, "projects"),
      where("userid", "!=", uid)
    );
    const projectQuerySnapshot = getDocs(otherProjectsQuery);
    projectQuerySnapshot
      .then((q) => {
        q.forEach((project) => {
          list.push({
            id: project.id,
            title: project.data().title,
            tag: project.data().tag,
            description: project.data().description,
            user: project.data().username,
            self: false,
          });
        });
        setProjectItems(list);
        setLoaded(true);
      })
      .catch((e) => alert(e.message));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ padding: 10 }}>
        <View>
          {projectItems.length == 0 && loaded == true && (
            <Text>No projects created by other users yet.</Text>
          )}
          {projectItems.length != 0 &&
            projectItems.map((project) => (
              <ProjectItem
                key={project.id}
                pid={project.id}
                title={project.title}
                tag={project.tag}
                description={project.description}
                user={project.user}
                self={project.self}
              />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProjectScreen;
