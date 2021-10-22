import React from 'react';
import { View, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import Header from '../../components/header';
import Panel from '../../components/panel';
import Container from '../../components/container';
import List from '../../components/list';
import ButtonAdd from '../../components/buttonAdd';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './index';

type ProdutorListProp = NativeStackNavigationProp<RootStackParamList, 'ProdutorList'>

const ProdutorList = () => {

    const navigation = useNavigation<ProdutorListProp>();

    const OnNavigateToAdd = (event: GestureResponderEvent) => navigation.navigate('ProdutorAdd');

    const data = [
        {
            Nome: 'Anakin Skywalker',
            CPF: '000.000.000-00',
        },
        {
            Nome: 'Luke Skywalker',
            CPF: '111.111.111-11',
        },
        {
            Nome: 'Tony Stark',
            CPF: '222.222.222-22',
        },
        {
            Nome: 'Peter Parker',
            CPF: '333.333.333-33',
        },
        {
            Nome: 'Bruce Wayne',
            CPF: '444.444.444-44',
        },
        {
            Nome: 'Clark Kent',
            CPF: '555.555.555-55',
        },
        {
            Nome: 'Steve Rogers',
            CPF: '666.666.666-66',
        },
        {
            Nome: 'Lois Lane',
            CPF: '777.777.777-77',
        },
        {
            Nome: 'Lana Lang',
            CPF: '888.888.888-88',
        },
    ]

    return (
        <Container>
            <Header title="PRODUTORES" />
            <Panel>
                {data.map(item => (
                    <List title={item.Nome} desc={item.CPF} key={item.CPF} />
                ))}
            </Panel>
            <ButtonAdd OnPress={OnNavigateToAdd} />
        </Container>
    );
}

const styles = StyleSheet.create({
    item: {
        height: 75,
        width: '97%',
        backgroundColor: 'white',
        elevation: 10,
        marginBottom: 7.5,
        justifyContent: 'center',
        paddingLeft: 30
    },
    title: {
        fontSize: 18,
        fontWeight: '700'
    },
    desc: {
        fontSize: 16,
        fontWeight: '500'
    },
});


export default ProdutorList;