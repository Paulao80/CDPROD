import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Header from '../components/header';

const ProdutorScreen = () => {
    return (
        <View style={styles.container}>
            <Header title="PRODUTORES" />
            <View style={styles.body}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    body: {
        width: '90%',
        height: (Dimensions.get('window').height / 5) * 4 - 7.5,
        backgroundColor: 'white',
        margin: -15,
        elevation: 10
    }
});


export default ProdutorScreen;