// Navigation/Navigation.js

//import {createAppContainer } from 'react-navigation'
import "react-native-gesture-handler";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

import Search from "../Components/Search";
import FilmDetail from "../Components/FilmDetail";
import Favorites from "../Components/Favorites";

const Stack = createStackNavigator();
const SearchStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ title: "Recherche" }}
      />
      <Stack.Screen name="FilmDetail" component={FilmDetail} />
    </Stack.Navigator>
  );
};
const FavoritesStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{ title: "Favoris" }}
      />
      <Stack.Screen name="FilmDetail" component={FilmDetail} />
    </Stack.Navigator>
  );
};
const Tab = createBottomTabNavigator();

const MoviesTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          showIcon: true,
          activeBackgroundColor: "#DDDDDD",
          inactiveBackgroundColor: '#FFFFFF'
        }}
      >
        <Tab.Screen
          name="Search"
          component={SearchStackNavigator}
          options={{
            tabBarIcon: () => {
              return (
                <Image
                  source={require("../Images/ic_search.png")}
                  style={styles.icon}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Favoris"
          component={FavoritesStackNavigator}
          options={{
            tabBarIcon: () => {
              return (
                <Image
                  source={require("../Images/ic_favorite.png")}
                  style={styles.icon}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});

export default MoviesTabNavigator;
