import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/header';
import Panel from '../components/panel';
import Container from '../components/container';
import List from '../components/list';

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

const PropriedadeScreen = () => {
    return (
        <Container>
            <Header title="PROPRIEDADES" />
            <Panel>
                {data.map(item => (
                    <List title={item.Nome} desc={item.NIRF} key={item.NIRF} />
                ))}
            </Panel>
        </Container>
    );
}

export default PropriedadeScreen;