import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import ButtonSave from "../../components/buttonSave";
import Container from "../../components/container";
import Header from "../../components/header";
import Panel from "../../components/panel";
import dataUfs from "../../data/ufs.json";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from ".";
import { FormPropriedadeType } from "../../hooks/usePropriedade";
import { Produtor } from "../../interfaces";
import MaskInput from "react-native-mask-input";

type PropriedadeAddProp = NativeStackScreenProps<
  RootStackParamList,
  "PropriedadeAdd"
> & {
  form: FormPropriedadeType;
  onAdd: () => Promise<boolean>;
  list: () => Promise<Produtor[] | undefined>;
};

interface ProdutorSelect {
  label: string;
  value: number;
}

interface uf {
  label: string;
  value: string;
}

const PropriedadeAdd = (props: PropriedadeAddProp) => {
  const { navigation, form, onAdd, list } = props;
  const [dataProdutores, setDataProdutores] = useState<Produtor[]>([]);

  useEffect(() => {
    form.resetForm();
    list().then((resp) => {
      if (resp) setDataProdutores(resp);
    });
  }, []);

  const OnNavigateToList = () => navigation.navigate("PropriedadeList");

  const produtores = dataProdutores.map((item) => {
    return {
      label: `${item.ProdutorId} - ${item.Nome}`,
      value: item.ProdutorId,
    } as ProdutorSelect;
  });

  const Ufs = dataUfs.map((item) => {
    return {
      label: item.nome,
      value: item.sigla,
    } as uf;
  });

  return (
    <Container>
      <Header title="ADICIONAR PROPRIEDADE" />
      <Panel background>
        <View style={styles.control}>
          <MaskInput
            style={styles.input}
            placeholder="NIRF"
            placeholderTextColor="black"
            mask={[
              /\d/,
              ".",
              /\d/,
              /\d/,
              /\d/,
              ".",
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
            ]}
            onChangeText={(Nirf) => form.setForm({ Nirf })}
            value={form.formValues.Nirf}
          />
        </View>

        <View style={styles.control}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="black"
            onChangeText={(Nome) => form.setForm({ Nome })}
            value={form.formValues.Nome}
          />
        </View>

        <View style={styles.control}>
          <TextInput
            style={styles.input}
            placeholder="Inscrição Estadual"
            placeholderTextColor="black"
            onChangeText={(InscEstadual) => form.setForm({ InscEstadual })}
            value={form.formValues.InscEstadual}
          />
        </View>

        <View style={styles.control}>
          <TextInput
            style={styles.input}
            placeholder="Endereço"
            placeholderTextColor="black"
            onChangeText={(Endereco) => form.setForm({ Endereco })}
            value={form.formValues.Endereco}
          />
        </View>

        <View style={styles.control}>
          <TextInput
            style={styles.input}
            placeholder="Municipio"
            placeholderTextColor="black"
            onChangeText={(Municipio) => form.setForm({ Municipio })}
            value={form.formValues.Municipio}
          />
        </View>

        <View style={styles.control}>
          <RNPickerSelect
            onValueChange={(Estado) => form.setForm({ Estado })}
            placeholder={{
              label: "Estado",
              value: undefined,
            }}
            items={Ufs}
            style={customPickerStyles}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        <View style={styles.control}>
          <RNPickerSelect
            onValueChange={(ProdutorId) =>
              form.setForm({ Produtor: { ProdutorId } })
            }
            placeholder={{
              label: "Produtor",
              value: undefined,
            }}
            items={produtores}
            style={customPickerStyles}
            useNativeAndroidPickerStyle={false}
          />
        </View>
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

export default PropriedadeAdd;
