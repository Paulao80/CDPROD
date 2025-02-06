import React, { useEffect } from "react";
import { StyleSheet, View, TextInput, Switch, Text } from "react-native";
import Container from "../../../components/container";
import Header from "../../../components/header";
import Panel from "../../../components/panel";
import ButtonSave from "../../../components/buttonSave";
import { FormContaType } from "../../../hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../index";
import { Produtor } from "../../../interfaces";

type ContaAddProp = NativeStackScreenProps<RootStackParamList, "ContaAdd"> & {
  form: FormContaType;
  onAdd: () => Promise<boolean>;
};

const ContaAdd = (props: ContaAddProp) => {
  const { navigation, route, form, onAdd } = props;
  const produtor = route.params?.item as Produtor | undefined;

  useEffect(() => {
    form.resetForm();
    if (produtor) form.setForm({ Produtor: produtor });
  }, []);

  const OnNavigateToList = () => navigation.navigate("ContaList");

  return (
    <Container>
      <Header title="ADICIONAR CONTA" />
      <Panel background>
        <View style={styles.switch}>
          <Text>Pertence ao produtor?</Text>
          <Switch
            onValueChange={(PertenceProdutor) =>
              form.setForm({ PertenceProdutor })
            }
            value={form.formValues.PertenceProdutor}
          />
        </View>
        <View style={styles.control}>
          <TextInput
            style={styles.input}
            placeholder="Nome pertence"
            placeholderTextColor="black"
            onChangeText={(NomePertence) => form.setForm({ NomePertence })}
            value={form.formValues.NomePertence}
            editable={!form.formValues.PertenceProdutor}
          />
        </View>

        <View style={styles.control}>
          <TextInput
            style={styles.input}
            placeholder="Banco"
            placeholderTextColor="black"
            onChangeText={(Banco) => form.setForm({ Banco })}
            value={form.formValues.Banco}
          />
        </View>

        <View style={styles.control}>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            placeholder="Agência"
            placeholderTextColor="black"
            onChangeText={(Agencia) => form.setForm({ Agencia })}
            value={form.formValues.Agencia}
          />
        </View>

        <View style={styles.control}>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            placeholder="Conta"
            placeholderTextColor="black"
            onChangeText={(Conta) => form.setForm({ Conta })}
            value={form.formValues.Conta}
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

export default ContaAdd;
