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
import { ProdutoresTanques, Tanque } from "../../../interfaces";

type ProdTanqueListProp = NativeStackScreenProps<
  RootStackParamList,
  "ProdTanqueList"
> & {
  prodTanques: ProdutoresTanques[];
  onSearchByTanqueId: (id: number) => Promise<void>;
  onDel: (id: number) => Promise<boolean>;
};

const ProdTanqueList = (props: ProdTanqueListProp) => {
  const { navigation, route, prodTanques, onSearchByTanqueId, onDel } = props;
  const tanque = route.params?.item as Tanque | undefined;

  const OnNavigateToAdd = (event: GestureResponderEvent) =>
    navigation.navigate("ProdTanqueAdd", { item: tanque });

  const OnNavigateToDetails = (item: any) =>
    navigation.navigate("ProdTanqueDetails", { item });

  useEffect(() => {
    if (tanque?.TanqueId) onSearchByTanqueId(tanque?.TanqueId);
  }, []);

  function onDelHandler(item: ProdutoresTanques) {
    if (item.ProdutorTanqueId) onDel(item.ProdutorTanqueId);
  }

  return (
    <Container>
      <Header title="PRODUTORES DO TANQUE" />
      <Panel background={false}>
        {prodTanques.map((item, key) => (
          <List
            item={item}
            title={item.Produtor?.Nome}
            desc={item.Produtor?.CpfCnpj}
            key={`prodtanque-${key}`}
            onPress={OnNavigateToDetails}
            menuItens={[
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

export default ProdTanqueList;
