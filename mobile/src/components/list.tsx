import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Item = {
  title: any;
  desc?: string;
  foto?: any;
  item?: any;
  onPress?: (item: any) => void;
};

const List = ({ title, desc, foto, item, onPress }: Item) => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.item,
          {
            backgroundColor: pressed ? "#e0e0e0" : "white",
          },
        ]}
        onLongPress={() => {
          setMenuVisible(!menuVisible);
        }}
        onPress={() => {
          if (onPress && item) onPress(item);
        }}
      >
        {foto !== undefined ? (
          <Image
            style={styles.image}
            source={{
              uri: foto,
            }}
          />
        ) : null}
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{desc}</Text>
        </View>
        <View style={{ ...styles.menu, right: menuVisible ? 0 : "-40%" }}>
          <Pressable
            style={({ pressed }) => [
              styles.menuItem,
              {
                backgroundColor: pressed ? "#e0e0e0" : "white",
              },
            ]}
          >
            <MaterialIcons name="edit" size={20} color="black" />
            <Text>Editar</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.menuItem,
              {
                backgroundColor: pressed ? "#e0e0e0" : "white",
              },
            ]}
          >
            <MaterialIcons name="delete" size={20} color="black" />
            <Text>Excluir</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.menuItem,
              {
                backgroundColor: pressed ? "#e0e0e0" : "white",
              },
            ]}
          >
            <MaterialIcons name="credit-card" size={20} color="black" />
            <Text>Contas</Text>
          </Pressable>
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 75,
    width: "97%",
    elevation: 10,
    marginBottom: 7.5,
    alignItems: "center",
    paddingLeft: 30,
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  desc: {
    fontSize: 16,
    fontWeight: "500",
  },
  image: {
    width: 65,
    height: 65,
    marginRight: 10,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "black",
    resizeMode: "cover",
  },
  menu: {
    height: "100%",
    width: "35%",
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    elevation: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  menuItem: {
    height: "31%",
    width: "100%",
    border: "5px solid orange",
    elevation: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default List;
