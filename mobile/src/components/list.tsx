import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

type Item = {
    title: any;
    desc?: string;
    foto?: any;
}

const List = ({ title, desc, foto }: Item) => {
    return (
        <Pressable style={({ pressed }) => [
            styles.item,
            {
                backgroundColor: pressed ? '#e0e0e0' : 'white'
            }
        ]}>
            {foto !== undefined ? (<Image style={styles.image} source={{
                uri: foto
            }} />) : null}
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.desc}>{desc}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    item: {
        height: 75,
        width: '97%',
        elevation: 10,
        marginBottom: 7.5,
        alignItems: 'center',
        paddingLeft: 30,
        flexDirection: 'row'
    },
    title: {
        fontSize: 18,
        fontWeight: '700'
    },
    desc: {
        fontSize: 16,
        fontWeight: '500'
    },
    image: {
        width: 65,
        height: 65,
        marginRight: 10,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'black',
        resizeMode: 'cover'
    }
});

export default List;