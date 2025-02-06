import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Produtor from './Produtor';
import Propriedade from './Propriedade';
import Tanque from './Tanque';
import { MaterialIcons } from '@expo/vector-icons';


const HomeScreen = () => {

    const { Navigator, Screen } = createBottomTabNavigator();

    return (
        <>
            <Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        switch (route.name) {
                            default: return <MaterialIcons name="local-drink" size={40} color={color} />
                            case 'Produtores': return <MaterialIcons name="person" size={40} color={color} />
                            case 'Propriedades': return <MaterialIcons name="house" size={40} color={color} />
                        }
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'white',
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: '#FABE36',
                    },
                    tabBarShowLabel: false,
                })}
            >
                <Screen name="Produtores" component={Produtor} />
                <Screen name="Propriedades" component={Propriedade} />
                <Screen name="Tanques" component={Tanque} />
            </Navigator>
        </>
    )
}

export default HomeScreen;