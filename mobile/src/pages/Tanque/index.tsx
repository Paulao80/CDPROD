import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TanqueList from './list';
import TanqueAdd from './add';

export type RootStackParamList = {
    TanqueList: undefined;
    TanqueAdd: undefined;
}

const TanqueScreen = () => {
    const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="TanqueList" component={TanqueList} />
            <Screen name="TanqueAdd" component={TanqueAdd} />
        </Navigator>
    );

}

export default TanqueScreen;