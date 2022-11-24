import React, { useEffect } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Container from "../../components/container";
import Header from "../../components/header";
import Panel from "../../components/panel";
import RNPickerSelect from "react-native-picker-select";
import dataUfs from "../../data/ufs.json";
import ButtonSave from "../../components/buttonSave";
import { FormProdutorType } from "../../hooks";
import MaskInput from "react-native-mask-input";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from ".";

type ProdutorAddProp = NativeStackScreenProps<
  RootStackParamList,
  "ProdutorAdd"
> & {
  form: FormProdutorType;
  onAdd: () => Promise<boolean>;
};

interface uf {
  label: string;
  value: string;
}

const ProdutorAdd = (props: ProdutorAddProp) => {
  const { navigation, form, onAdd } = props;

  useEffect(() => {
    form.resetForm();
  }, []);

  const OnNavigateToList = () => navigation.navigate("ProdutorList");

  const Ufs = dataUfs.map((item) => {
    return {
      label: item.nome,
      value: item.sigla,
    } as uf;
  });

  const CPF_MASK = [
    /\d/,
    /\d/,
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
    /\d/,
  ];
  const CNPJ_MASK = [
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    "/",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
  ];

  return (
    <Container>
      <Header title="ADICIONAR PRODUTOR" />
      <Panel background>
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
          <MaskInput
            style={styles.input}
            placeholder="Data de Nascimento"
            placeholderTextColor="black"
            mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
            onChangeText={(DataNasc) => form.setForm({ DataNasc })}
            value={form.formValues.DataNasc}
          />
        </View>

        <View style={styles.control}>
          <RNPickerSelect
            onValueChange={(TipoPessoa) => form.setForm({ TipoPessoa })}
            placeholder={{
              label: "Tipo de Pessoa",
              value: undefined,
            }}
            items={[
              {
                label: "Física",
                value: 1,
              },
              {
                label: "Jurídica",
                value: 2,
              },
            ]}
            style={customPickerStyles}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        <View style={styles.control}>
          <TextInput
            style={styles.input}
            placeholder="Nacionalidade"
            placeholderTextColor="black"
            onChangeText={(Nacionalidade) => form.setForm({ Nacionalidade })}
            value={form.formValues.Nacionalidade}
          />
        </View>

        <View style={styles.control}>
          <MaskInput
            style={styles.input}
            placeholder="CPF/CNPJ"
            placeholderTextColor="black"
            mask={form.formValues.TipoPessoa === 1 ? CPF_MASK : CNPJ_MASK}
            onChangeText={(CpfCnpj) => form.setForm({ CpfCnpj })}
            value={form.formValues.CpfCnpj}
          />
        </View>

        <View style={styles.control}>
          <MaskInput
            style={styles.input}
            placeholder="Registro Geral"
            placeholderTextColor="black"
            mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
            onChangeText={(RG) => form.setForm({ RG })}
            value={form.formValues.RG}
          />
        </View>

        <View style={styles.control}>
          <TextInput
            style={styles.input}
            placeholder="Orgão de Expedição"
            placeholderTextColor="black"
            onChangeText={(OrgaoExp) => form.setForm({ OrgaoExp })}
            value={form.formValues.OrgaoExp}
          />
        </View>

        <View style={styles.control}>
          <RNPickerSelect
            onValueChange={(EstadoExp) => form.setForm({ EstadoExp })}
            placeholder={{
              label: "Estado de Expedição",
              value: undefined,
            }}
            items={Ufs}
            style={customPickerStyles}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        <View style={styles.control}>
          <MaskInput
            style={styles.input}
            placeholder="Data de Expedição"
            placeholderTextColor="black"
            mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
            onChangeText={(DataExp) => form.setForm({ DataExp })}
            value={form.formValues.DataExp}
          />
        </View>

        <View style={styles.control}>
          <RNPickerSelect
            onValueChange={(EstadoCivil) => form.setForm({ EstadoCivil })}
            placeholder={{
              label: "Estado civil",
              value: undefined,
            }}
            items={[
              {
                label: "solteiro(a)",
                value: 1,
              },
              {
                label: "casado(a)",
                value: 2,
              },
              {
                label: "separado(a)",
                value: 3,
              },
              {
                label: "divorciado(a)",
                value: 4,
              },
              {
                label: "viúvo(a)",
                value: 5,
              },
            ]}
            style={customPickerStyles}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        <View style={styles.control}>
          <MaskInput
            style={styles.input}
            placeholder="Telefone"
            placeholderTextColor="black"
            mask={[
              "(",
              /\d/,
              /\d/,
              ")",
              " ",
              /\d/,
              " ",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
            onChangeText={(Telefone) => form.setForm({ Telefone })}
            value={form.formValues.Telefone}
          />
        </View>

        <View style={styles.control}>
          <TextInput
            style={styles.input}
            placeholder="Ultimo Laticinio"
            placeholderTextColor="black"
            onChangeText={(UltLaticinio) => form.setForm({ UltLaticinio })}
            value={form.formValues.UltLaticinio}
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

export default ProdutorAdd;
