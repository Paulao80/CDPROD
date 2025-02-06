import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProdutorList from "./list";
import ProdutorAdd from "./add";
import ProtudorDetails from "./details";
import ProdutorEdit from "./edit";
import ContaList from "./Conta/list";
import ContaDetails from "./Conta/details";
import { useProdutor } from "../../hooks";
import { useContaBancaria } from "../../hooks/useContaBancaria";
import ContaAdd from "./Conta/add";
import ContaEdit from "./Conta/edit";

export type RootStackParamList = {
  ProdutorList?: undefined;
  ProdutorAdd?: undefined;
  ProdutorDetails?: {
    item: any;
  };
  ProdutorEdit?: {
    item: any;
  };
  ContaList?: {
    item: any;
  };
  ContaAdd?: {
    item: any;
  };
  ContaDetails?: {
    item: any;
  };
  ContaEdit?: {
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

  const {
    contas,
    onSearchByProdutoId,
    onDel: onDelConta,
    form: formConta,
    onEdit: onEditConta,
    onAdd: onAddConta,
  } = useContaBancaria();

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
      <Screen name="ContaList">
        {(props) => {
          return (
            <ContaList
              {...props}
              contas={contas}
              onSearchByProdutoId={onSearchByProdutoId}
              onDel={onDelConta}
            />
          );
        }}
      </Screen>
      <Screen name="ContaDetails" component={ContaDetails} />
      <Screen name="ContaAdd">
        {(props) => {
          return <ContaAdd {...props} form={formConta} onAdd={onAddConta} />;
        }}
      </Screen>
      <Screen name="ContaEdit">
        {(props) => {
          return <ContaEdit {...props} form={formConta} onEdit={onEditConta} />;
        }}
      </Screen>
    </Navigator>
  );
};

export default ProdutorScreen;
