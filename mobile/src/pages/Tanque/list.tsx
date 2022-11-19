import React, { useEffect } from "react";
import { GestureResponderEvent } from "react-native";
import Header from "../../components/header";
import Panel from "../../components/panel";
import Container from "../../components/container";
import List from "../../components/list";
import ButtonAdd from "../../components/buttonAdd";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./index";
import { Tanque } from "../../interfaces";
import { MaterialIcons } from "@expo/vector-icons";
import { formatTipoTanque } from "../../utils/formatTipoTanque";

type TanqueListProp = NativeStackScreenProps<
  RootStackParamList,
  "TanqueList"
> & {
  tanques: Tanque[];
  onSearch: () => Promise<void>;
  onDel: (id: number) => Promise<boolean>;
};

const TanqueList = (props: TanqueListProp) => {
  const { navigation, tanques, onSearch, onDel } = props;

  const OnNavigateToAdd = (event: GestureResponderEvent) =>
    navigation.navigate("TanqueAdd");

  const OnNavigateToDetails = (item: any) =>
    navigation.navigate("TanqueDetails", { item });

  const OnNavigateToEdit = (item: any) =>
    navigation.navigate("TanqueEdit", { item });

  useEffect(() => {
    onSearch();
  }, []);

  function onDelHandler(item: Tanque) {
    if (item.TanqueId) onDel(item.TanqueId);
  }

  return (
    <Container>
      <Header title="TANQUES" />
      <Panel background={false}>
        {tanques.map((item, key) => (
          <List
            item={item}
            foto={item.FotoPath}
            title={item.TanqueId}
            desc={formatTipoTanque(item.TipoTanque)}
            key={`tanques-${key}`}
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

export default TanqueList;
