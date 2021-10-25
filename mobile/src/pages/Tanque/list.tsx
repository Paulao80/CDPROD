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
import data from '../../data/tanques.json';

type ProdutorListProp = NativeStackNavigationProp<RootStackParamList, 'TanqueList'>

const TanqueList = () => {
    const navigation = useNavigation<ProdutorListProp>();

    const OnNavigateToAdd = (event: GestureResponderEvent) => navigation.navigate('TanqueAdd');

    return (
        <Container>
            <Header title="TANQUES" />
            <Panel background={false}>
                {data.map(item => (
                    <List title={item.TanqueId} desc={item.Tipo} key={item.TanqueId} foto={item.Foto} />
                ))}
            </Panel>
            <ButtonAdd OnPress={OnNavigateToAdd} />
        </Container>
    )
}

export default TanqueList;