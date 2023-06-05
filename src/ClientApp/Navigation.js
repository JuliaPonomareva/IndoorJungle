import React from 'react';
import Mainn from './components/Mainn';
import CatalogPlants from './components/CatalogPlants';
import MyPlants from './components/MyPlants';
import Tasks from './components/Tasks';


import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function Navigate() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
            name="Mainn"
            component={Mainn}
            options={{
                title:'Главная страница',
                headerStyle:{backgroundColor: 'green', height:90},
                headerTitleStyle:{fontWeight:'light', textAlign: 'auto'},
        }}
            />
           
            <Stack.Screen
            name="CatalogPlants"
            component={CatalogPlants}
            options={{
                title: 'Каталог растений',
                headerStyle:{backgroundColor: 'green', height:90},
                headerTitleStyle:{fontWeight:'normal', textAlign: 'auto'},
            }}
            />
            <Stack.Screen
            name="MyPlants"
            component={MyPlants}
            options={{
                title: 'Мои растения',
                headerStyle:{backgroundColor: 'green', height:90},
                headerTitleStyle:{fontWeight:'normal', textAlign: 'auto'},
            }}
            />
            <Stack.Screen
            name="Tasks"
            component={Tasks}
            options={{
                title: 'Задачи',
                headerStyle:{backgroundColor: 'green', height:90},
                headerTitleStyle:{fontWeight:'normal', textAlign: 'auto'},
            }}
            />
        </Stack.Navigator>
    </NavigationContainer>;
}