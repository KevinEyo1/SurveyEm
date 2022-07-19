import { StyleSheet, Text, View } from "react-native";
import { React, useState } from "react";
import CreateSurveyItem from "../components/CreateSurveyItem";
import { createSurveyData } from "../model/data";

const ShowSurveyScreen = () => {
  return (
    <View>
      {true == true &&
        createSurveyData.map((item) => (
          <CreateSurveyItem
            key={item.id}
            question={item.question}
            label={item.label}
          />
        ))}
    </View>
  );
};

export default ShowSurveyScreen;

const styles = StyleSheet.create({});
