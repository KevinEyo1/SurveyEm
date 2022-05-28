import React from "react";
import { SafeAreaView, Text, ScrollView } from "react-native";
import { View } from "react-native";

import { rewardsData } from "../model/data";
import RewardsItem from "../components/RewardsItem";

function RewardsScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ padding: 10 }}>
        {/* top header bar */}
        <View>
          {true == true &&
            rewardsData.map((item) => (
              <RewardsItem
                key={item.id}
                title={item.title}
                image={item.image}
                pointCosts={item.pointCosts}
              />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RewardsScreen;
