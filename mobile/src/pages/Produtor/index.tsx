import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProdutorList from './list';
import ProdutorAdd from './add';

export type RootStackParamList = {
    ProdutorList: undefined;
    ProdutorAdd: undefined;
}

const ProdutorScreen = () => {
    const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="ProdutorList" component={ProdutorList} />
            <Screen name="ProdutorAdd" component={ProdutorAdd} />
        </Navigator>
    );
}

export default ProdutorScreen;