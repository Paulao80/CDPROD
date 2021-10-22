import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text } from 'react-native';
import Container from "../../components/container";
import Header from "../../components/header";
import Panel from "../../components/panel";
import RNPickerSelect from "react-native-picker-select";
import dataUfs from '../../data/ufs.json';
import ButtonSave from '../../components/buttonSave';

interface uf {
    label: string;
    value: string;
}

const ProdutorAdd = () => {

    const [Nome, setNome] = useState<string>();
    const [DataNasc, setDataNasc] = useState<string>();
    const [TipoPessoa, setTipoPessoa] = useState<number>();
    const [Nacionalidade, setNacionalidade] = useState<string>();
    const [CpfCnpj, setCpfCnpj] = useState<string>();
    const [RG, setRG] = useState<string>();
    const [OrgaoExp, setOrgaoExp] = useState<string>();
    const [EstadoExp, setEstadoExp] = useState<string>();
    const [DataExp, setDataExp] = useState<string>();
    const [EstadoCivil, setEstadoCivil] = useState<number>();
    const [Telefone, setTelefone] = useState<string>();
    const [UltLaticinio, setUltLaticinio] = useState<string>();

    const Ufs = dataUfs.map(item => {
        return {
            label: item.nome,
            value: item.sigla
        } as uf;
    });

    return (
        <Container>
            <Header title="ADICIONAR PRODUTOR" />
            <Panel background>
                <View style={styles.control}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome"
                        placeholderTextColor="black"
                        onChangeText={setNome}
                        value={Nome}
                    />
                </View>

                <View style={styles.control}>
                    <TextInput
                        style={styles.input}
                        placeholder="Data de Nascimento"
                        placeholderTextColor="black"
                        onChangeText={setDataNasc}
                        value={DataNasc}
                    />
                </View>

                <View style={styles.control}>
                    <RNPickerSelect
                        onValueChange={(value) => setTipoPessoa(value)}
                        placeholder={{
                            label: "Tipo de Pessoa",
                            value: undefined
                        }}
                        items={[
                            {
                                label: "Física",
                                value: 1
                            },
                            {
                                label: "Jurídica",
                                value: 2
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
                        onChangeText={setNacionalidade}
                        value={Nacionalidade}
                    />
                </View>

                <View style={styles.control}>
                    <TextInput
                        style={styles.input}
                        placeholder="CPF/CNPJ"
                        placeholderTextColor="black"
                        onChangeText={setCpfCnpj}
                        value={CpfCnpj}
                    />
                </View>

                <View style={styles.control}>
                    <TextInput
                        style={styles.input}
                        placeholder="Registro Geral"
                        placeholderTextColor="black"
                        onChangeText={setRG}
                        value={RG}
                    />
                </View>

                <View style={styles.control}>
                    <TextInput
                        style={styles.input}
                        placeholder="Orgão de Expedição"
                        placeholderTextColor="black"
                        onChangeText={setOrgaoExp}
                        value={OrgaoExp}
                    />
                </View>

                <View style={styles.control}>
                    <RNPickerSelect
                        onValueChange={(value) => setEstadoExp(value)}
                        placeholder={{
                            label: "Estado de Expedição",
                            value: undefined
                        }}
                        items={Ufs}
                        style={customPickerStyles}
                        useNativeAndroidPickerStyle={false}
                    />
                </View>

                <View style={styles.control}>
                    <TextInput
                        style={styles.input}
                        placeholder="Data de Expedição"
                        placeholderTextColor="black"
                        onChangeText={setDataExp}
                        value={DataExp}
                    />
                </View>

                <View style={styles.control}>
                    <RNPickerSelect
                        onValueChange={(value) => setEstadoCivil(value)}
                        placeholder={{
                            label: "Estado civil",
                            value: undefined
                        }}
                        items={[
                            {
                                label: "solteiro(a)",
                                value: 1
                            },
                            {
                                label: "casado(a)",
                                value: 2
                            },
                            {
                                label: "separado(a)",
                                value: 3
                            },
                            {
                                label: "divorciado(a)",
                                value: 4
                            },
                            {
                                label: "viúvo(a)",
                                value: 5
                            },
                        ]}
                        style={customPickerStyles}
                        useNativeAndroidPickerStyle={false}
                    />
                </View>

                <View style={styles.control}>
                    <TextInput
                        style={styles.input}
                        placeholder="Telefone"
                        placeholderTextColor="black"
                        onChangeText={setTelefone}
                        value={Telefone}
                    />
                </View>

                <View style={styles.control}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ultimo Laticinio"
                        placeholderTextColor="black"
                        onChangeText={setUltLaticinio}
                        value={UltLaticinio}
                    />
                </View>
                <View style={styles.br} />
            </Panel>
            <ButtonSave />
        </Container>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
    },
    label: {
        textAlign: 'left',
        width: '100%',
        marginBottom: 5,
        paddingLeft: 5,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4a4a4a'
    },
    control: {
        width: '100%',
        marginBottom: 15
    },
    br: {
        height: 60
    }
});

const customPickerStyles = StyleSheet.create({
    inputIOS: {
        color: 'black',
        height: 50,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5
    },
    inputAndroid: {
        color: 'black',
        height: 50,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5
    },
    placeholder: {
        color: 'black'
    }
});

export default ProdutorAdd;