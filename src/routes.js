import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';
import Repository from './pages/Repository';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerStyle: {backgroundColor: '#7159c1'},
        }}>
        <Stack.Screen name="Main" options={{title: 'Menu'}} component={Main} />
        <Stack.Screen
          name="User"
          options={{
            title: 'Usuários',
          }}
          component={User}
        />
        <Stack.Screen
          name="Repository"
          options={{title: 'Repositório'}}
          component={Repository}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
