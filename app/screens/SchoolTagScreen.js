import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { React, useState, useEffect, useCallback } from "react";

import DropDownPicker from "react-native-dropdown-picker";

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

const SchoolTagScreen = ({ navigation }) => {
  const [tagValue, setTagValue] = useState(0);

  const [yearOpen, setYearOpen] = useState(false);
  const [yearValue, setYearValue] = useState(null);
  const [yearItems, setYearItems] = useState([
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
  ]);

  const [majorOpen, setMajorOpen] = useState(false);
  const [majorValue, setMajorValue] = useState(null);
  const [majorItems, setMajorItems] = useState([
    { label: "Major", value: 4 },
    { label: "Minor", value: 1 },
  ]);

  const [tags, setTags] = useState([]);
  const [tagOpen, setTagOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState("");

  const [schools, setSchools] = useState([]);
  const [schoolOpen, setSchoolOpen] = useState(false);
  const [selectedSchools, setSelectedSchools] = useState("");

  const [eduOpen, setEduOpen] = useState(false);
  const [eduValue, setEduValue] = useState(null);
  const [eduItems, setEduItems] = useState([
    { label: "Undergraduate", value: 1 },
    { label: "Degree", value: 2 },
    { label: "Masters", value: 4 },
    { label: "Ph.D", value: 8 },
  ]);

  const onSchoolOpen = useCallback(() => {
    setYearOpen(false);
    setEduOpen(false);
    setMajorOpen(false);
    setTagOpen(false);
  });

  const onYearOpen = useCallback(() => {
    setEduOpen(false);
    setTagOpen(false);
    setMajorOpen(false);
    setSchoolOpen(false);
  });

  const onEduOpen = useCallback(() => {
    setYearOpen(false);
    setTagOpen(false);
    setMajorOpen(false);
    setSchoolOpen(false);
  });

  const onTagOpen = useCallback(() => {
    setYearOpen(false);
    setEduOpen(false);
    setMajorOpen(false);
    setSchoolOpen(false);
  });

  const onMajorOpen = useCallback(() => {
    setYearOpen(false);
    setTagOpen(false);
    setEduOpen(false);
    setSchoolOpen(false);
  });

  useEffect(() => {
    getTags();
    getSchools();
  }, []);

  useEffect(() => {
    setTagValue(yearValue + majorValue + eduValue);
  }, [yearValue, majorValue, eduValue]);

  const handleCreate = () => {
    if (
      yearValue == null ||
      eduValue == null ||
      majorValue == null ||
      selectedSchools == "" ||
      selectedTags == ""
    ) {
      Alert.alert("Missing Fields.");
    } else {
      const userRef = doc(db, "users", auth.currentUser.uid);
      updateDoc(userRef, {
        tagApplications: arrayUnion({
          type: "School",
          school: selectedSchools,
          field: selectedTags,
          year: yearValue,
          major: majorValue,
          edu: eduValue,
          approved: true,
        }),
      });
      const userDoc = getDoc(userRef);
      userDoc.then(async (q) => {
        const tagVs = q
          .data()
          .ownedTags.find((x) => x.tagField == selectedTags);
        if (tagVs != undefined) {
          if (tagValue > tagVs.tagValue) {
            await updateDoc(userRef, {
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
              tagField: selectedTags,
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
      })
      .catch((e) => alert(e.message));
  };

  const getSchools = () => {
    const list = [];
    const schQuerySnapshot = getDocs(collection(db, "schools"));
    schQuerySnapshot
      .then((q) => {
        q.forEach((sch) => {
          list.push({ label: sch.data().name, value: sch.data().name });
        });
        setSchools(list);
      })
      .catch((e) => alert(e.message));
  };

  return (
    <SafeAreaView style={styles.inputContainer}>
      <Text>School of Study</Text>
      <DropDownPicker
        style={styles.dropdown}
        open={schoolOpen}
        value={selectedSchools}
        items={schools}
        onOpen={onSchoolOpen}
        setOpen={setSchoolOpen}
        setValue={setSelectedSchools}
        setItems={setSchools}
        maxHeight={80}
      />

      <View style={{ zIndex: -0.5 }}>
        <Text>Years of Study</Text>
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

      <View style={{ zIndex: -1.5 }}>
        <Text>Major or Minor</Text>
        <DropDownPicker
          style={styles.dropdown}
          open={majorOpen}
          value={majorValue}
          items={majorItems}
          onOpen={onMajorOpen}
          setOpen={setMajorOpen}
          setValue={setMajorValue}
          setItems={setMajorItems}
          maxHeight={80}
        />
      </View>

      <View style={{ zIndex: -2 }}>
        <Text>Field of Study</Text>
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

      <View style={{ zIndex: -3 }}>
        <Text>Education Level</Text>
        <DropDownPicker
          style={styles.dropdown}
          open={eduOpen}
          value={eduValue}
          items={eduItems}
          onOpen={onEduOpen}
          setOpen={setEduOpen}
          setValue={setEduValue}
          setItems={setEduItems}
          maxHeight={80}
        />
      </View>

      <TouchableOpacity onPress={handleCreate} style={[styles.tagbutton]}>
        <Text style={styles.buttonText}>Create Tag</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SchoolTagScreen;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#E6E6E6",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    bottom: 30,
  },
  inputContainer: {
    padding: 20,
    marginTop: 60,
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
  tagbutton: {
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
});
