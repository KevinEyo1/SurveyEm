import { React, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";

import { auth, db } from "../../firebase";

function RewardsItem({ title, description, coinsCost, tnc, redeem }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.coinsCost}>{coinsCost}</Text>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalCenter}>
          <View style={styles.modalView}>
            <View style={styles.inputContainer}>
              {tnc.map((condition) => (
                <Text style={styles.tncText}>{condition}</Text>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textClose}>X</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.buttonAdd]}
              onPress={() => {
                setModalVisible(!modalVisible);
                redeem();
              }}
            >
              <Text style={styles.textStyle}>Redeem Reward</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonContent}>View Reward</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 10,
    borderColor: "white",
    backgroundColor: "lightblue",
    height: 150,
  },
  title: { padding: 20, position: "absolute", height: "50%" },
  image: { height: "50%", right: "50%" },
  description: { marginTop: 50 },
  coinsCost: {
    padding: 20,
    position: "absolute",
    right: 0,
    bottom: 0,
    height: "50%",
  },

  button: {
    padding: 6,
    position: "absolute",
    left: 0,
    bottom: 0,
    marginBottom: 15,
    marginLeft: 10,
    borderRadius: 20,
    fontSize: 10,
    fontFamily: "OpenSans_700Bold",
    backgroundColor: "#C7755A",
  },
  buttonContent: {
    fontSize: 10,
    fontFamily: "OpenSans_700Bold",
    color: "white",
  },
  modalCenter: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    alignSelf: "center",
  },
  buttonClose: {
    position: "absolute",
    right: 0,
    borderRadius: 20,
    padding: 10,
  },
  buttonAdd: {
    backgroundColor: "#C7755A",
    width: "60%",
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 20,
    padding: 10,
  },
  textClose: {
    color: "black",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  tncText: {
    marginBottom: 20,
  },
});

export default RewardsItem;
