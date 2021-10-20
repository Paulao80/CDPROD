import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/header';
import Panel from '../components/panel';
import Container from '../components/container';
import List from '../components/list';
import Tanque1 from '../../assets/1.jpg';
import Tanque2 from '../../assets/2.jpg';
import Tanque3 from '../../assets/3.png';
import Tanque4 from '../../assets/4.jpg';
import Tanque5 from '../../assets/5.jpg';


const data = [
    {
        TanqueId: 1,
        Tipo: 'Individual',
        Foto: Tanque1
    },
    {
        TanqueId: 2,
        Tipo: 'Individual',
        Foto: Tanque2
    },
    {
        TanqueId: 3,
        Tipo: 'Individual',
        Foto: Tanque3
    },
    {
        TanqueId: 4,
        Tipo: 'Individual',
        Foto: Tanque4
    },
    {
        TanqueId: 5,
        Tipo: 'Individual',
        Foto: Tanque5
    },
]

const TanqueScreen = () => {
    return (
        <Container>
            <Header title="TANQUES" />
            <Panel>
                {data.map(item => (
                    <List title={item.TanqueId} desc={item.Tipo} key={item.TanqueId} foto={item.Foto} />
                ))}
            </Panel>
        </Container>
    )
}

export default TanqueScreen;