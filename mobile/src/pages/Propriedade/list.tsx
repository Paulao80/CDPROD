import React, { useEffect } from "react";
import { GestureResponderEvent } from "react-native";
import Header from "../../components/header";
import Panel from "../../components/panel";
import Container from "../../components/container";
import List from "../../components/list";
import ButtonAdd from "../../components/buttonAdd";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./index";
import { Propriedade } from "../../interfaces";
import { MaterialIcons } from "@expo/vector-icons";

type PropriedadeListProp = NativeStackScreenProps<
  RootStackParamList,
  "PropriedadeList"
> & {
  propriedades: Propriedade[];
  onSearch: () => Promise<void>;
  onDel: (id: number) => Promise<boolean>;
};

const PropriedadeList = (props: PropriedadeListProp) => {
  const { navigation, propriedades, onSearch, onDel } = props;

  const OnNavigateToAdd = (event: GestureResponderEvent) =>
    navigation.navigate("PropriedadeAdd");

  const OnNavigateToDetails = (item: any) =>
    navigation.navigate("PropriedadeDetails", { item });

  const OnNavigateToEdit = (item: any) =>
    navigation.navigate("PropriedadeEdit", { item });

  useEffect(() => {
    onSearch();
  }, []);

  function onDelHandler(item: Propriedade) {
    if (item.PropriedadeId) onDel(item.PropriedadeId);
  }

  return (
    <Container>
      <Header title="PROPRIEDADES" />
      <Panel background={false}>
        {propriedades.map((item, key) => (
          <List
            item={item}
            title={item.Nome}
            desc={item.Nirf}
            key={`propriedade-${key}`}
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

export default PropriedadeList;
