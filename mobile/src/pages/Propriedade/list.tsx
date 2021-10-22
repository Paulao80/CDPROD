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

type ProdutorListProp = NativeStackNavigationProp<RootStackParamList, 'PropriedadeList'>

const data = [
    {
        Nome: 'Fazenda Darth Vader',
        NIRF: '000000'
    },
    {
        Nome: 'Fazenda 3 Patinhos',
        NIRF: '000001'
    },
    {
        Nome: 'Fazenda Onça Negra',
        NIRF: '000002'
    },
    {
        Nome: 'Fazenda Onça Pintada',
        NIRF: '000003'
    },
]

const PropriedadeList = () => {

    const navigation = useNavigation<ProdutorListProp>();

    const OnNavigateToAdd = (event: GestureResponderEvent) => navigation.navigate('PropriedadeAdd');

    return (
        <Container>
            <Header title="PROPRIEDADES" />
            <Panel background={false}>
                {data.map(item => (
                    <List title={item.Nome} desc={item.NIRF} key={item.NIRF} />
                ))}
            </Panel>
            <ButtonAdd OnPress={OnNavigateToAdd} />
        </Container>
    );
}

export default PropriedadeList;