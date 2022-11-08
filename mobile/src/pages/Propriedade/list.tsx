import React from 'react';
import { GestureResponderEvent } from 'react-native';
import Header from '../../components/header';
import Panel from '../../components/panel';
import Container from '../../components/container';
import List from '../../components/list';
import ButtonAdd from '../../components/buttonAdd';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './index';
import data from '../../data/propriedades.json';

type ProdutorListProp = NativeStackNavigationProp<RootStackParamList, 'PropriedadeList'>

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