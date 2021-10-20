import React from 'react';
import { View, StyleSheet } from 'react-native';

const Container: React.FC = (props) => {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    }
});

export default Container;