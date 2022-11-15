import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProdutorList from "./list";
import ProdutorAdd from "./add";
import ProtudorDetails from "./details";

export type RootStackParamList = {
  ProdutorList?: {
    reload?: boolean;
  };
  ProdutorAdd?: undefined;
  ProdutorDetails?: {
    item: any;
  };
};

const ProdutorScreen = () => {
  const { Navigator, Screen } =
    createNativeStackNavigator<RootStackParamList>();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="ProdutorList" component={ProdutorList} />
      <Screen name="ProdutorAdd" component={ProdutorAdd} />
      <Screen name="ProdutorDetails" component={ProtudorDetails} />
    </Navigator>
  );
};

export default ProdutorScreen;
