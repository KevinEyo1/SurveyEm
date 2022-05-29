import React from "react";
import {
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";

import { homeFeedData } from "../model/data";
import HomeFeedItem from "../components/HomeFeedItem";

function HomeScreen({ navigator }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ padding: 10 }}>
        {/* top header bar */}
        <View>
          {true == true &&
            homeFeedData.map((item) => (
              <HomeFeedItem
                key={item.id}
                type={item.type}
                title={item.title}
                responder={item.responder}
              />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;

//   return (
//     <View style={styles.container}>
//       <Text>Email: </Text>
//       <TouchableOpacity onPress={handleSignOut} style={styles.button}>
//         <Text style={styles.buttonText}>Sign Out</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   buttonText: {
//     color: "white",
//     fontWeight: "700",
//     fontSize: 16,
//   },
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   button: {
//     backgroundColor: "#0782F9",
//     width: "60%",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 40,
//   },
// });
