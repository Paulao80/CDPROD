import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './pages/Home';

const Routes = () => {

    const { Screen, Navigator } = createDrawerNavigator();

    return (
        <NavigationContainer>
            <Navigator>
                <Screen name="CDTR" component={Home} options={{ headerShown: false }} />
            </Navigator>
        </NavigationContainer>
    );

}

export default Routes;