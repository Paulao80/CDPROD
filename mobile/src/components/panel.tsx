import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';

type Props = {
    children?: React.ReactNode,
    background: boolean
}

const Panel: React.FC<Props> = ({ children, background }) => {
    return (
        <ScrollView style={background ? styles.scroll2 : styles.scroll}>
            <View style={styles.body}>
                {children}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    body: {
        width: '100%',
        alignItems: 'center'
    },
    scroll: {
        width: '90%',
        height: (Dimensions.get('window').height / 5) * 4 - 7.5,
        margin: -15,
    },
    scroll2: {
        width: '90%',
        height: (Dimensions.get('window').height / 5) * 4 - 7.5,
        margin: -15,
        backgroundColor: 'white',
        padding: 10,
        paddingTop: 20,
        elevation: 10
    }
});

export default Panel;