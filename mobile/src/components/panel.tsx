import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useDimension } from "../hooks";

type Props = {
  children?: React.ReactNode;
  background: boolean;
};

const Panel: React.FC<Props> = ({ children, background }) => {
  const { screen, keyboardHeight, statusBarHeight } = useDimension();
  console.log("🚀 ~ file: panel.tsx ~ line 12 ~ statusBarHeight", statusBarHeight)

  const diferenca = ((10 / screen.scale) * screen.scale * 8.75);
  console.log("🚀 ~ file: panel.tsx ~ line 14 ~ diferenca", diferenca);

  const styles = StyleSheet.create({
    body: {
      width: "100%",
      alignItems: "center",
    },
    scroll: {
      width: "90%",
      height: screen.height - screen.height / 5 - diferenca,
      margin: -15,
    },
    scroll2: {
      width: "90%",
      height: screen.height - screen.height / 5 - keyboardHeight - diferenca,
      margin: -15,
      backgroundColor: "white",
      padding: 10,
      paddingTop: 20,
      elevation: 10,
    },
  });

  return (
    <ScrollView style={background ? styles.scroll2 : styles.scroll}>
      <View style={styles.body}>{children}</View>
    </ScrollView>
  );
};

export default Panel;
