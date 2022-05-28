import React from "react";
import { SafeAreaView, Text, ScrollView } from "react-native";
import { View } from "react-native";

import { surveyData } from "../model/data";
import SurveyItem from "../components/SurveyItem";

function SurveyScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ padding: 10 }}>
        {/* top header bar */}
        <View>
          {true == true &&
            surveyData.map((item) => (
              <SurveyItem
                key={item.id}
                title={item.title}
                field={item.field}
                user={item.user}
                points={item.points}
              />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SurveyScreen;
