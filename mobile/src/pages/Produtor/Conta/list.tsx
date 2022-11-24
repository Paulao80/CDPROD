import React, { useEffect } from "react";
import { GestureResponderEvent } from "react-native";
import Header from "../../../components/header";
import Panel from "../../../components/panel";
import Container from "../../../components/container";
import List from "../../../components/list";
import ButtonAdd from "../../../components/buttonAdd";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../index";
import { MaterialIcons } from "@expo/vector-icons";
import { ContaBancaria, Produtor } from "../../../interfaces";

type ContaListProp = NativeStackScreenProps<RootStackParamList, "ContaList"> & {
  contas: ContaBancaria[];
  onSearchByProdutoId: (id: number) => Promise<void>;
  onDel: (id: number) => Promise<boolean>;
};

const ContaList = (props: ContaListProp) => {
  const { navigation, route, contas, onSearchByProdutoId, onDel } = props;
  const produtor = route.params?.item as Produtor | undefined;

  const OnNavigateToAdd = (event: GestureResponderEvent) =>
    navigation.navigate("ContaAdd", { item: produtor });

  const OnNavigateToDetails = (item: any) =>
    navigation.navigate("ContaDetails", { item });

  const OnNavigateToEdit = (item: any) =>
    navigation.navigate("ContaEdit", { item });

  useEffect(() => {
    if (produtor?.ProdutorId) onSearchByProdutoId(produtor?.ProdutorId);
  }, []);

  function onDelHandler(item: ContaBancaria) {
    if (item.ContaId) onDel(item.ContaId);
  }

  return (
    <Container>
      <Header title="CONTAS BANCÁRIAS" />
      <Panel background={false}>
        {contas.map((item, key) => (
          <List
            item={item}
            title={item.Banco}
            desc={item.Conta}
            key={`conta-${key}`}
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
            ]}
          />
        ))}
      </Panel>
      <ButtonAdd OnPress={OnNavigateToAdd} />
    </Container>
  );
};

export default ContaList;
