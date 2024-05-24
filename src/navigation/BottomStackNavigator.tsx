import React, { useEffect } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoriteBooks from '../screens/FavoriteBooks';
import SearchIcon from '../svg/SearchIcon';
import FavoriteIcon from '../svg/FavoriteIcon';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { loadFav } from '../redux/favoriteBooksSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';


const BottomStackNavigator = () => {


const Tab = createBottomTabNavigator();
const dispatch:AppDispatch = useDispatch()
  useEffect(()=>{
    AsyncStorage.getItem('favBooks').then((data)=>{
      if (data) dispatch(loadFav(JSON.parse(data)));
    });
    
  },[])
  return (
    <Tab.Navigator   screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName =  <SearchIcon isFocused={focused}/> ;
          } else if (route.name === 'FavoriteBooks') {
             iconName =  <FavoriteIcon isFocused={focused}/> ;
          }
          return iconName;
        },
        tabBarLabelStyle:{fontSize:12,fontWeight:'600'},
        tabBarActiveTintColor: '#2088F3',
        tabBarInactiveTintColor: '#666',
        // headerShown:false
      })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{tabBarLabel:'Search Books'}} />
      <Tab.Screen name="FavoriteBooks" component={FavoriteBooks} options={{tabBarLabel:'Favorite Books',headerTitle:"Fav Books"}} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default BottomStackNavigator;
