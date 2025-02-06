import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDimension } from "../hooks";

type props = {
  title: string;
};

const Header = ({ title }: props) => {
  const { screen } = useDimension();

  const styles = StyleSheet.create({
    header: {
      backgroundColor: "#FABE36",
      width: "100%",
      height: (screen.height) / 5,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: "white",
    },
  });

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;
