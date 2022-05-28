import React from "react";
import { SafeAreaView, Text, ScrollView } from "react-native";
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
