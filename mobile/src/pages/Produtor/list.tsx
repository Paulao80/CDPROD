import React, { useEffect } from "react";
import { GestureResponderEvent } from "react-native";
import Header from "../../components/header";
import Panel from "../../components/panel";
import Container from "../../components/container";
import List from "../../components/list";
import ButtonAdd from "../../components/buttonAdd";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./index";
import { MaterialIcons } from "@expo/vector-icons";
import { Produtor } from "../../interfaces";

type ProdutorListProp = NativeStackScreenProps<
  RootStackParamList,
  "ProdutorList"
> & {
  produtores: Produtor[];
  onSearch: () => Promise<void>;
  onDel: (id: number) => Promise<boolean>;
};

const ProdutorList = (props: ProdutorListProp) => {
  const { navigation, produtores, onSearch, onDel } = props;

  const OnNavigateToAdd = (event: GestureResponderEvent) =>
    navigation.navigate("ProdutorAdd");

  const OnNavigateToDetails = (item: any) =>
    navigation.navigate("ProdutorDetails", { item });

  const OnNavigateToEdit = (item: any) =>
    navigation.navigate("ProdutorEdit", { item });

  const OnNavigateToContas = (item: any) =>
    navigation.navigate("ContaList", { item });

  useEffect(() => {
    onSearch();
  }, []);

  function onDelHandler(item: Produtor) {
    if (item.ProdutorId) onDel(item.ProdutorId);
  }

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
            menuItens={[
              {
                label: "Editar",
                icon: <MaterialIcons name="edit" size={20} color="black" />,
                onPress: OnNavigateToEdit,
              },
              {
                label: "Excluir",
                icon: <MaterialIcons name="delete" size={20} color="black" />,
                onPress: onDelHandler,
              },
              {
                label: "Contas",
                icon: (
                  <MaterialIcons name="credit-card" size={20} color="black" />
                ),
                onPress: OnNavigateToContas,
              },
            ]}
          />
        ))}
      </Panel>
      <ButtonAdd OnPress={OnNavigateToAdd} />
    </Container>
  );
};

export default ProdutorList;
