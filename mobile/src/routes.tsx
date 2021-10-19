import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';

const Routes = () => {

    const { Screen, Navigator } = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Navigator>
                <Screen name="CDTR" component={Home} options={{ headerShown: false }} />
            </Navigator>
        </NavigationContainer>
    );

}

export default Routes;