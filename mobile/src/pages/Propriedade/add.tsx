import React, { useState } from "react";
import { StyleSheet, TextInput, View } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import ButtonSave from "../../components/buttonSave";
import Container from "../../components/container";
import Header from "../../components/header";
import Panel from "../../components/panel";
import data from '../../data/produtores.json';
import dataUfs from '../../data/ufs.json';

interface Produtor {
    label: string;
    value: number;
}

interface uf {
    label: string;
    value: string;
}

const PropriedadeAdd = () => {

    const [Nirf, setNirf] = useState<string>();
    const [Nome, setNome] = useState<string>();
    const [InscEstadual, setInscEstadual] = useState<string>();
    const [Endereco, setEndereco] = useState<string>();
    const [Municipio, setMunicipio] = useState<string>();
    const [Estado, setEstado] = useState<string>();
    const [ProdutorId, setProdutorId] = useState<number>();

    const produtores = data.map(item => {
        return {
            label: `${item.ProdutorId} - ${item.Nome}`,
            value: item.ProdutorId
        } as Produtor;
    });

    const Ufs = dataUfs.map(item => {
        return {
            label: item.nome,
            value: item.sigla
        } as uf;
    });

    return (
        <Container>
            <Header title="ADICIONAR PROPRIEDADE" />
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
                        placeholder="NIRF"
                        placeholderTextColor="black"
                        onChangeText={setNirf}
                        value={Nirf}
                    />
                </View>

                <View style={styles.control}>
                    <TextInput
                        style={styles.input}
                        placeholder="Inscrição Estadual"
                        placeholderTextColor="black"
                        onChangeText={setInscEstadual}
                        value={InscEstadual}
                    />
                </View>

                <View style={styles.control}>
                    <TextInput
                        style={styles.input}
                        placeholder="Endereço"
                        placeholderTextColor="black"
                        onChangeText={setEndereco}
                        value={Endereco}
                    />
                </View>

                <View style={styles.control}>
                    <TextInput
                        style={styles.input}
                        placeholder="Municipio"
                        placeholderTextColor="black"
                        onChangeText={setMunicipio}
                        value={Municipio}
                    />
                </View>

                <View style={styles.control}>
                    <RNPickerSelect
                        onValueChange={(value) => setEstado(value)}
                        placeholder={{
                            label: "Estado",
                            value: undefined
                        }}
                        items={Ufs}
                        style={customPickerStyles}
                        useNativeAndroidPickerStyle={false}
                    />
                </View>

                <View style={styles.control}>
                    <RNPickerSelect
                        onValueChange={(value) => setProdutorId(value)}
                        placeholder={{
                            label: "Produtor",
                            value: undefined
                        }}
                        items={produtores}
                        style={customPickerStyles}
                        useNativeAndroidPickerStyle={false}
                    />
                </View>
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

export default PropriedadeAdd;