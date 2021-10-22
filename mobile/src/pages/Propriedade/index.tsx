import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PropriedadeList from './list';
import PropriedadeAdd from './add';

export type RootStackParamList = {
    PropriedadeList: undefined;
    PropriedadeAdd: undefined;
}

const PropriedadeScreen = () => {
    const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="PropriedadeList" component={PropriedadeList} />
            <Screen name="PropriedadeAdd" component={PropriedadeAdd} />
        </Navigator>
    );
}

export default PropriedadeScreen;