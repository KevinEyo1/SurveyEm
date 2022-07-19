import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { React, useState, useEffect, useCallback } from "react";

import DropDownPicker from "react-native-dropdown-picker";

import { auth, db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";

const SchoolTagScreen = ({ navigation }) => {
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
    { label: "Major", value: 3 },
    { label: "Minor", value: 1 },
  ]);

  const [tags, setTags] = useState([]);
  const [tagOpen, setTagOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const [eduOpen, setEduOpen] = useState(false);
  const [eduValue, setEduValue] = useState(null);
  const [eduItems, setEduItems] = useState([
    { label: "Undergraduate", value: 1 },
    { label: "Degree", value: 2 },
    { label: "Masters", value: 4 },
    { label: "Ph.D", value: 8 },
  ]);

  const onYearOpen = useCallback(() => {
    setEduOpen(false);
    setTagOpen(false);
    setMajorOpen(false);
  });

  const onEduOpen = useCallback(() => {
    setYearOpen(false);
    setTagOpen(false);
    setMajorOpen(false);
  });

  const onTagOpen = useCallback(() => {
    setYearOpen(false);
    setEduOpen(false);
    setMajorOpen(false);
  });

  const onMajorOpen = useCallback(() => {
    setYearOpen(false);
    setTagOpen(false);
    setEduOpen(false);
  });

  useEffect(() => {
    getTags();
  }, []);

  DropDownPicker.setMode("BADGE");

  const tagValue = eduValue + yearValue;

  const handleCreate = () => {
    console.log("%s: " + tagValue, selectedTags);
    navigation.navigate("ProcessTag");
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

  return (
    <SafeAreaView style={styles.inputContainer}>
      <DropDownPicker
        style={styles.dropdown}
        placeholder="Year of Study"
        open={yearOpen}
        value={yearValue}
        items={yearItems}
        onOpen={onYearOpen}
        setOpen={setYearOpen}
        setValue={setYearValue}
        setItems={setYearItems}
        maxHeight={80}
      />

      <View style={{ zIndex: -0.5 }}>
        <DropDownPicker
          style={styles.dropdown}
          placeholder="Major/Minor"
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

      <View style={{ zIndex: -1 }}>
        <DropDownPicker
          style={styles.dropdown}
          placeholder="Field of Study"
          open={tagOpen}
          value={selectedTags}
          items={tags}
          onOpen={onTagOpen}
          setOpen={setTagOpen}
          setValue={setSelectedTags}
          setItems={setTags}
          multiple={true}
          min={1}
          max={5}
          maxHeight={80}
        />
      </View>

      <View style={{ zIndex: -2 }}>
        <DropDownPicker
          style={styles.dropdown}
          placeholder="Education Level"
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

      <TouchableOpacity style={styles.upload}>
        <Text>Upload File</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCreate} style={[styles.button]}>
        <Text style={styles.buttonText}>Create Tag</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SchoolTagScreen;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 20,
    marginTop: 20,
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
  upload: {
    backgroundColor: "lightgrey",
    alignSelf: "center",
    padding: 5,
    borderRadius: 10,
    marginBottom: 20,
    zIndex: -3,
  },
});
