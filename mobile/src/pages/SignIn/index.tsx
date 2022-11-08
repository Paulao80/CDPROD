import React, { useState } from "react";
import {
  Button,
  TextInput,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Container from "../../components/container";
import Header from "../../components/header";
import { useAuth } from "../../contexts/Auth";

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 20,
  },
  formLogin: {
    marginTop: -15,
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    height: Dimensions.get("window").height - 122,
    backgroundColor: "white",
  },
  titulo: {
    marginTop: 50,
    marginBottom: 30,
    width: "100%",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FF9900",
    padding: 10
  },
  textButton: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

const SingIn = () => {
  const { signIn } = useAuth();

  const [emailOrUser, setEmailOrUser] = useState<string>();
  const [password, setPassword] = useState<string>();

  async function handleSingIn() {
    await signIn({
      EmailOrUser: emailOrUser,
      Password: password,
    });
  }

  return (
    <Container>
      <Header title="CDPROD" />
      <View style={styles.formLogin}>
        <Text style={styles.titulo}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail ou Usuário"
          placeholderTextColor="black"
          onChangeText={setEmailOrUser}
          value={emailOrUser}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="black"
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity style={styles.button} onPress={handleSingIn}>
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default SingIn;
