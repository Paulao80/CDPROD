import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDimension } from "../hooks";

type props = {
  OnPress?: (event: GestureResponderEvent) => void;
};

const ButtonSave = ({ OnPress }: props) => {
  const { screen } = useDimension();

  const styles = StyleSheet.create({
    button: {
      padding: 10,
      backgroundColor: "#60c32a",
      position: "absolute",
      bottom: -12,
      borderRadius: 23,
      elevation: 15,
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={OnPress}>
      <MaterialIcons name="save" size={28} color="white" />
    </TouchableOpacity>
  );
};

export default ButtonSave;
