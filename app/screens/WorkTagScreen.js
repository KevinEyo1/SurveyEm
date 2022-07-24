import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { React, useState, useEffect, useCallback } from "react";

import DropDownPicker from "react-native-dropdown-picker";

import * as DocumentPicker from "expo-document-picker";

import { auth, db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";

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
    { label: "1-5", value: 1 },
    { label: "5-8", value: 2 },
    { label: "8-12", value: 3 },
    { label: "12-16", value: 4 },
    { label: "16-20", value: 5 },
    { label: ">20", value: 6 },
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

  const [doc, setDoc] = useState();
  const storage = getStorage();
  const storageRef = ref(storage, "Education Certificates");

  useEffect(() => {
    getTags();
    getPos();
    getOrg();
    getStorage();
  }, []);

  DropDownPicker.setMode("BADGE");

  const tagValue = posValue + yearValue;

  const handleCreate = () => {
    console.log("%s: " + tagValue + ", " + orgValue, selectedTags);
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

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    }).then((response) => {
      if (response.type == "success") {
        let { name, size, uri } = response;
        let nameParts = name.split(".");
        let fileType = nameParts[nameParts.length - 1];
        var fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: "application/" + fileType,
        };
        console.log(fileToUpload, "...............file");
        setDoc(fileToUpload);
      }
    });
    console.log(result);
    console.log("Doc: " + doc.uri);
  };

  const postDocument = () => {
    const fileUri = doc.uri;
    // const url = "gs://surveyem-ad0cf.appspot.com/Education Certificates";
    // const formData = new FormData();

    // formData.append("document", doc);
    // const options = {
    //   method: "POST",
    //   body: formData,
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "multipart/form-data",
    //   },
    // };
    // console.log(formData);

    // fetch(url, options).catch((error) => console.log(error));

    uploadBytes(storageRef, doc).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
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
          multiple={true}
          min={1}
          max={5}
          maxHeight={80}
        />
      </View>

      <TouchableOpacity style={styles.upload} onPress={pickDocument}>
        <Text>Select File</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.upload} onPress={postDocument}>
        <Text>Upload File</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCreate} style={[styles.button]}>
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
