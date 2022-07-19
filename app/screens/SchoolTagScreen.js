import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { React, useState, useEffect } from "react";

import DropDownPicker from "react-native-dropdown-picker";

import { auth, db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";

const SchoolTagScreen = () => {
  const [yearOpen, setYearOpen] = useState(false);
  const [yearValue, setYearValue] = useState(null);
  const [yearItems, setYearItems] = useState([
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
  ]);

  const [tags, setTags] = useState([]);
  const [tagOpen, setTagOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState(null);

  const [eduOpen, setEduOpen] = useState(false);
  const [eduValue, setEduValue] = useState(null);
  const [eduItems, setEduItems] = useState([
    { label: "Undergraduate", value: 1 },
    { label: "Degree", value: 2 },
    { label: "Masters", value: 4 },
    { label: "Ph.D", value: 8 },
  ]);

  useEffect(() => {
    getTags();
  }, []);

  const tagValue = eduValue + yearValue;

  const handleCreate = () => {
    console.log("%s: " + tagValue, selectedTags);
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
        setOpen={setYearOpen}
        setValue={setYearValue}
        setItems={setYearItems}
      />

      <View style={{ zIndex: -1 }}>
        <DropDownPicker
          style={styles.dropdown}
          placeholder="Field of Study"
          open={tagOpen}
          value={selectedTags}
          items={tags}
          setOpen={setTagOpen}
          setValue={setSelectedTags}
          setItems={setTags}
        />
      </View>

      <View style={{ zIndex: -2 }}>
        <DropDownPicker
          style={styles.dropdown}
          placeholder="Education Level"
          open={eduOpen}
          value={eduValue}
          items={eduItems}
          setOpen={setEduOpen}
          setValue={setEduValue}
          setItems={setEduItems}
        />
      </View>

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
    marginBottom: 10,
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
});
