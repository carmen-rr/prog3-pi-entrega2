import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {FontAwesome5} from '@expo/vector-icons'

import Home from '../screens/Home/Home';
import HomeNavigation from './HomeNavigation';
import MenuNav from '../screens/MenuNav/MenuNav';
import Post from '../screens/Post/Post';
import Profile from '../screens/Profile/Profile';



const Tab = createBottomTabNavigator()

export default function TabNavigation() {
    
    return (
        <Tab.Navigator>
            <Tab.Screen 
            name='Home' 
            component={HomeNavigation}
            options ={{
                tabBarIcon : () => <FontAwesome5 name='home' size={28} color='#2e8b57' />
            }}
            />

            <Tab.Screen 
            name='Search' 
            component={MenuNav}
            options ={{
                tabBarIcon : () => <FontAwesome5 name='bone' size={28}  color='#2e8b57'/>
            }}
            />

        <Tab.Screen 
            name='New Post' 
            component={Post}
            options ={{
                tabBarIcon : () => <FontAwesome5 name='plus-circle' size={28} color='#2e8b57' />
            }}
            />

        <Tab.Screen 
            name='Profile' 
            component={Profile}
            options ={{
                tabBarIcon : () => <FontAwesome5 name='paw' size={28} color='#2e8b57' />
            }}
            />
        </Tab.Navigator>
    );
}
