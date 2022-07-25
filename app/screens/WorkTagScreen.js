import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { React, useState, useEffect, useCallback } from "react";

import DropDownPicker from "react-native-dropdown-picker";

import * as DocumentPicker from "expo-document-picker";

import { auth, db } from "../../firebase";
import {
  getDocs,
  collection,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import { getStorage, ref, uploadBytes } from "firebase/storage";

const WorkTagScreen = ({ navigation }) => {
  const [orgOpen, setOrgOpen] = useState(false);
  const [orgItems, setOrgItems] = useState([]);
  const [orgValue, setOrgValue] = useState(null);

  const [posOpen, setPosOpen] = useState(false);
  const [posItems, setPosItems] = useState([]);
  const [posValue, setPosValue] = useState(null);

  const [tags, setTags] = useState([]);
  const [tagOpen, setTagOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const [yearOpen, setYearOpen] = useState(false);
  const [yearValue, setYearValue] = useState(null);
  const [yearItems, setYearItems] = useState([
    { label: "1-5", value: 4 },
    { label: "5-8", value: 6 },
    { label: "8-12", value: 8 },
    { label: "12-16", value: 10 },
    { label: "16-20", value: 12 },
    { label: ">20", value: 14 },
  ]);

  const onYearOpen = useCallback(() => {
    setPosOpen(false);
    setTagOpen(false);
    setOrgOpen(false);
  });

  const onPosOpen = useCallback(() => {
    setYearOpen(false);
    setTagOpen(false);
    setOrgOpen(false);
  });

  const onOrgOpen = useCallback(() => {
    setPosOpen(false);
    setTagOpen(false);
    setYearOpen(false);
  });

  const onTagOpen = useCallback(() => {
    setPosOpen(false);
    setYearOpen(false);
    setOrgOpen(false);
  });

  useEffect(() => {
    getTags();
    getPos();
    getOrg();
  }, []);

  const [tagValue, setTagValue] = useState(0);
  const handleCreate = async () => {
    if (
      yearValue == null ||
      posValue == null ||
      orgValue == null ||
      selectedTags == ""
    ) {
      Alert.alert("Missing Fields.");
    } else {
      setTagValue(yearValue + posValue);
      const userRef = doc(db, "users", auth.currentUser.uid);
      updateDoc(userRef, {
        tagApplications: arrayUnion({
          type: "Work",
          field: selectedTags,
          year: yearValue,
          pos: posValue,
          org: orgValue,
          approved: true,
        }),
      });
      const userDoc = getDoc(userRef);
      userDoc.then((q) => {
        const tagVs = q
          .data()
          .ownedTags.find((x) => x.tagField == selectedTags);
        if (tagVs != undefined) {
          if (tagValue > tagVs.tagValue) {
            updateDoc(userRef, {
              ownedTags: arrayRemove(tagVs),
            });
            updateDoc(userRef, {
              ownedTags: arrayUnion({
                tagField: selectedTags,
                tagValue: tagValue,
                approved: true,
              }),
            });
          }
        } else {
          updateDoc(userRef, {
            ownedTags: arrayUnion({
              tagField: tags,
              tagValue: tagValue,
              approved: true,
            }),
          });
        }
        navigation.navigate("ProcessTag");
      });
    }
  };

  const getTags = () => {
    const list = [];
    const tagQuerySnapshot = getDocs(collection(db, "tags"));
    tagQuerySnapshot
      .then((q) => {
        q.forEach((tag) => {
          list.push({ label: tag.data().tag, value: tag.data().tag });
        });
        setTags(list);
        console.log(list);
      })
      .catch((e) => alert(e.message));
  };

  const getOrg = () => {
    const list = [];
    const orgQuerySnapshot = getDocs(collection(db, "workplaces"));
    orgQuerySnapshot
      .then((q) => {
        q.forEach((org) => {
          list.push({ label: org.data().name, value: org.data().name });
        });
        setOrgItems(list);
        console.log(list);
      })
      .catch((e) => alert(e.message));
  };

  const getPos = () => {
    const list = [];
    const posQuerySnapshot = getDocs(collection(db, "workplacePositions"));
    posQuerySnapshot
      .then((q) => {
        q.forEach((pos) => {
          list.push({ label: pos.data().name, value: pos.data().tagPoint });
        });
        setPosItems(list);
        console.log(list);
      })
      .catch((e) => alert(e.message));
  };

  return (
    <SafeAreaView style={styles.inputContainer}>
      <Text>Organisation</Text>
      <DropDownPicker
        style={styles.dropdown}
        open={orgOpen}
        value={orgValue}
        items={orgItems}
        onOpen={onOrgOpen}
        setOpen={setOrgOpen}
        setValue={setOrgValue}
        setItems={setOrgItems}
        maxHeight={80}
      />
      <View style={{ zIndex: -0.5 }}>
        <Text>Position</Text>
        <DropDownPicker
          style={styles.dropdown}
          open={posOpen}
          value={posValue}
          items={posItems}
          onOpen={onPosOpen}
          setOpen={setPosOpen}
          setValue={setPosValue}
          setItems={setPosItems}
          maxHeight={80}
        />
      </View>

      <View style={{ zIndex: -1 }}>
        <Text>Years of Experience</Text>
        <DropDownPicker
          style={styles.dropdown}
          open={yearOpen}
          value={yearValue}
          items={yearItems}
          onOpen={onYearOpen}
          setOpen={setYearOpen}
          setValue={setYearValue}
          setItems={setYearItems}
          maxHeight={80}
        />
      </View>

      <View style={{ zIndex: -2 }}>
        <Text>Field of Expertise</Text>
        <DropDownPicker
          style={styles.dropdown}
          open={tagOpen}
          value={selectedTags}
          items={tags}
          onOpen={onTagOpen}
          setOpen={setTagOpen}
          setValue={setSelectedTags}
          setItems={setTags}
          maxHeight={80}
        />
      </View>

      <TouchableOpacity onPress={handleCreate} style={[styles.tagbutton]}>
        <Text style={styles.buttonText}>Create Tag</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WorkTagScreen;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 20,
    marginTop: 20,
    width: "80%",
  },
  dropdown: {
    padding: 15,
    marginBottom: 60,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    zIndex: -3,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
});
