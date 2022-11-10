import React, { useEffect, useState } from "react";
import { GestureResponderEvent } from "react-native";
import Header from "../../components/header";
import Panel from "../../components/panel";
import Container from "../../components/container";
import List from "../../components/list";
import ButtonAdd from "../../components/buttonAdd";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./index";
import { useProdutor } from "../../hooks";
import { Produtor } from "../../interfaces";

type ProdutorListProp = NativeStackNavigationProp<
  RootStackParamList,
  "ProdutorList"
>;

const ProdutorList = () => {
  const { produtores, onSearch } = useProdutor();

  const navigation = useNavigation<ProdutorListProp>();

  const OnNavigateToAdd = (event: GestureResponderEvent) =>
    navigation.navigate("ProdutorAdd");

  useEffect(() => {
    onSearch();
  }, []);

  return (
    <Container>
      <Header title="PRODUTORES" />
      <Panel background={false}>
        {produtores.map((item, key) => (
          <List title={item.Nome} desc={item.CpfCnpj} key={`produtor-${key}`} />
        ))}
      </Panel>
      <ButtonAdd OnPress={OnNavigateToAdd} />
    </Container>
  );
};

export default ProdutorList;
