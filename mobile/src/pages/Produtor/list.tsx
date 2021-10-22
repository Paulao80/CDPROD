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
import data from '../../data/produtores.json';

type ProdutorListProp = NativeStackNavigationProp<RootStackParamList, 'ProdutorList'>

const ProdutorList = () => {

    const navigation = useNavigation<ProdutorListProp>();

    const OnNavigateToAdd = (event: GestureResponderEvent) => navigation.navigate('ProdutorAdd');

    return (
        <Container>
            <Header title="PRODUTORES" />
            <Panel background={false}>
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