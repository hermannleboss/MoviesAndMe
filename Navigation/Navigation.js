// Navigation/Navigation.js

//import {createAppContainer } from 'react-navigation'
import 'react-native-gesture-handler';
import * as React from 'react';
import {Button, View, Text, Image} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'


const Stack = createStackNavigator();
const SearchStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ title: 'Recherche' }}
        />
        <Stack.Screen
          name="FilmDetail"
          component={FilmDetail}

        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default SearchStackNavigator;
