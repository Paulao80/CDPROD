import React, { useEffect } from "react";
import { GestureResponderEvent } from "react-native";
import Header from "../../components/header";
import Panel from "../../components/panel";
import Container from "../../components/container";
import List from "../../components/list";
import ButtonAdd from "../../components/buttonAdd";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./index";
import { useProdutor } from "../../hooks";

type ProdutorListProp = NativeStackScreenProps<
  RootStackParamList,
  "ProdutorList"
>;

const ProdutorList = (props: ProdutorListProp) => {
  const { navigation, route } = props;
  const { produtores, onSearch } = useProdutor();

  const OnNavigateToAdd = (event: GestureResponderEvent) =>
    navigation.navigate("ProdutorAdd");

  const OnNavigateToDetails = (item: any) =>
    navigation.navigate("ProdutorDetails", { item });

  useEffect(() => {
    onSearch();
  }, []);

  useEffect(() => {
    if (route.params?.reload) onSearch();
  }, [route.params?.reload]);

  return (
    <Container>
      <Header title="PRODUTORES" />
      <Panel background={false}>
        {produtores.map((item, key) => (
          <List
            item={item}
            title={item.Nome}
            desc={item.CpfCnpj}
            key={`produtor-${key}`}
            onPress={OnNavigateToDetails}
          />
        ))}
      </Panel>
      <ButtonAdd OnPress={OnNavigateToAdd} />
    </Container>
  );
};

export default ProdutorList;
