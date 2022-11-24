import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Switch, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Container from "../../../components/container";
import Header from "../../../components/header";
import Panel from "../../../components/panel";
import ButtonSave from "../../../components/buttonSave";
import { FormProdTanqueType } from "../../../hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../index";
import { Produtor, Tanque } from "../../../interfaces";

type ProdTanqueAddProp = NativeStackScreenProps<
  RootStackParamList,
  "ProdTanqueAdd"
> & {
  form: FormProdTanqueType;
  onAdd: () => Promise<boolean>;
  list: () => Promise<Produtor[] | undefined>;
};

interface ProdutorSelect {
  label: string;
  value: number;
}

interface ResponsavelSelect {
  label: string;
  value: boolean;
}

const ProdTanqueAdd = (props: ProdTanqueAddProp) => {
  const { navigation, route, form, onAdd, list } = props;
  const tanque = route.params?.item as Tanque | undefined;
  const [dataProdutores, setDataProdutores] = useState<Produtor[]>([]);

  useEffect(() => {
    form.resetForm();
    if (tanque) form.setForm({ Tanque: tanque });

    list().then((resp) => {
      if (resp) setDataProdutores(resp);
    });
  }, []);

  const produtores = dataProdutores.map((item) => {
    return {
      label: `${item.ProdutorId} - ${item.Nome}`,
      value: item.ProdutorId,
    } as ProdutorSelect;
  });

  const Responsavel: ResponsavelSelect[] = [
    {
      label: "Sim",
      value: true,
    },
    {
      label: "Não",
      value: false,
    },
  ];

  const OnNavigateToList = () => navigation.navigate("ProdTanqueList");

  return (
    <Container>
      <Header title="ADICIONAR PRODUTOR AO TANQUE" />
      <Panel background>
        <View style={styles.control}>
          <RNPickerSelect
            onValueChange={(ProdutorId) =>
              form.setForm({ Produtor: { ProdutorId } })
            }
            value={form.formValues.Produtor?.ProdutorId}
            placeholder={{
              label: "Produtor",
              value: undefined,
            }}
            items={produtores}
            style={customPickerStyles}
            useNativeAndroidPickerStyle={false}
          />
        </View>
        <View style={styles.control}>
          <RNPickerSelect
            onValueChange={(Responsavel) => form.setForm({ Responsavel })}
            value={form.formValues.Responsavel}
            placeholder={{
              label: "Reponsavel",
              value: undefined,
            }}
            items={Responsavel}
            style={customPickerStyles}
            useNativeAndroidPickerStyle={false}
          />
        </View>
        <View style={styles.br} />
      </Panel>
      <ButtonSave
        OnPress={() => {
          onAdd().then((resp) => {
            if (resp) OnNavigateToList();
          });
        }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  label: {
    textAlign: "left",
    width: "100%",
    marginBottom: 5,
    paddingLeft: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "#4a4a4a",
  },
  control: {
    width: "100%",
    marginBottom: 15,
  },
  switch: {
    width: "100%",
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  br: {
    height: 60,
  },
});

const customPickerStyles = StyleSheet.create({
  inputIOS: {
    color: "black",
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  inputAndroid: {
    color: "black",
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  placeholder: {
    color: "black",
  },
});

export default ProdTanqueAdd;
