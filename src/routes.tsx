import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';

import 'react-native-gesture-handler';
import Download from './pages/Download';
import Settings from './pages/Settings';

import { Profile } from './pages/Profile';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Usuários',
          }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Categorias',
            headerTitleStyle: {
              alignSelf: 'center',
            },
          }}
        />

        <Stack.Screen
          name="Download"
          component={Download}
          options={{
            title: 'Baixar',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            title: 'Configurações',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
