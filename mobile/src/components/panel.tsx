import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';

const Panel: React.FC = (props) => {
    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.body}>
                {props.children}
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
    }
});

export default Panel;