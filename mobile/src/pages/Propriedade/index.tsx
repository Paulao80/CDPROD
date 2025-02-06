import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PropriedadeList from "./list";
import PropriedadeAdd from "./add";
import PropriedadeDetails from "./details";
import { usePropriedade } from "../../hooks/usePropriedade";
import { useProdutor } from "../../hooks";
import PropriedadeEdit from "./edit";

export type RootStackParamList = {
  PropriedadeList: undefined;
  PropriedadeAdd: undefined;
  PropriedadeDetails?: {
    item: any;
  };
  PropriedadeEdit?: {
    item: any;
  };
};

const PropriedadeScreen = () => {
  const { Navigator, Screen } =
    createNativeStackNavigator<RootStackParamList>();

  const {
    propriedades,
    onSearch,
    onDel,
    form,
    onEdit,
    onAdd,
    formatFromApiToApp,
  } = usePropriedade();

  const { list } = useProdutor();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="PropriedadeList">
        {(props) => {
          return (
            <PropriedadeList
              {...props}
              propriedades={propriedades}
              onSearch={onSearch}
              onDel={onDel}
            />
          );
        }}
      </Screen>
      <Screen name="PropriedadeAdd">
        {(props) => {
          return (
            <PropriedadeAdd {...props} form={form} onAdd={onAdd} list={list} />
          );
        }}
      </Screen>
      <Screen name="PropriedadeDetails" component={PropriedadeDetails} />
      <Screen name="PropriedadeEdit">
        {(props) => {
          return (
            <PropriedadeEdit
              {...props}
              form={form}
              onEdit={onEdit}
              list={list}
              formatFromApiToApp={formatFromApiToApp}
            />
          );
        }}
      </Screen>
    </Navigator>
  );
};

export default PropriedadeScreen;
