import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

interface MenuItem {
  label: string;
  icon?: JSX.Element;
  onPress?: (item: any) => void;
}

type Item = {
  title: any;
  desc?: string;
  foto?: any;
  item?: any;
  onPress?: (item: any) => void;
  menuItens?: MenuItem[];
};

const List = ({ title, desc, foto, item, onPress, menuItens }: Item) => {
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
          setMenuVisible(false);
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
        ) : ''}
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{desc}</Text>
        </View>
        {menuItens && (
          <View style={{ ...styles.menu, right: menuVisible ? 0 : "-40%" }}>
            {menuItens.map((menuiItem, key) => {
              return (
                <Pressable
                  key={`menu-item-${key}`}
                  style={({ pressed }) => [
                    styles.menuItem,
                    {
                      backgroundColor: pressed ? "#e0e0e0" : "white",
                    },
                  ]}
                  onPress={() => {
                    setMenuVisible(false);
                    if (menuiItem.onPress) menuiItem.onPress(item);
                  }}
                >
                  {menuiItem.icon}
                  <Text>{menuiItem.label}</Text>
                </Pressable>
              );
            })}
          </View>
        )}
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
    justifyContent: "flex-start",
  },
  menuItem: {
    height: "30%",
    width: "100%",
    marginBottom: 3,
    border: "5px solid orange",
    elevation: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default List;
