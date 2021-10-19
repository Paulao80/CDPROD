import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

type props = {
    title: string;
}

const Header = ({ title }: props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FABE36',
        width: '100%',
        height: Dimensions.get('window').height / 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: 'white'
    }
});

export default Header;