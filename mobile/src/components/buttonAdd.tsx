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

const ButtonAdd = ({ OnPress }: props) => {
  const { screen } = useDimension();

  const styles = StyleSheet.create({
    button: {
      padding: 10,
      backgroundColor: "orange",
      position: "absolute",
      bottom: -12,
      borderRadius: 23,
      elevation: 5,
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={OnPress}>
      <MaterialIcons name="add" size={28} color="white" />
    </TouchableOpacity>
  );
};

export default ButtonAdd;
