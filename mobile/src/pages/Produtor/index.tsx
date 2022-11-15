import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProdutorList from "./list";
import ProdutorAdd from "./add";
import ProtudorDetails from "./details";
import ProdutorEdit from "./edit";
import { useProdutor } from "../../hooks";

export type RootStackParamList = {
  ProdutorList?: undefined;
  ProdutorAdd?: undefined;
  ProdutorDetails?: {
    item: any;
  };
  ProdutorEdit?: {
    item: any;
  };
};

const ProdutorScreen = () => {
  const { Navigator, Screen } =
    createNativeStackNavigator<RootStackParamList>();

  const {
    produtores,
    onSearch,
    onDel,
    form,
    onEdit,
    onAdd,
    formatFromApiToApp,
  } = useProdutor();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="ProdutorList">
        {(props) => {
          return (
            <ProdutorList
              {...props}
              produtores={produtores}
              onSearch={onSearch}
              onDel={onDel}
            />
          );
        }}
      </Screen>
      <Screen name="ProdutorAdd">
        {(props) => {
          return <ProdutorAdd {...props} form={form} onAdd={onAdd} />;
        }}
      </Screen>
      <Screen name="ProdutorDetails" component={ProtudorDetails} />
      <Screen name="ProdutorEdit">
        {(props) => {
          return (
            <ProdutorEdit
              {...props}
              form={form}
              onEdit={onEdit}
              formatFromApiToApp={formatFromApiToApp}
            />
          );
        }}
      </Screen>
    </Navigator>
  );
};

export default ProdutorScreen;
