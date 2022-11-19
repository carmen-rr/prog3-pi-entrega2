import { View, Text } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import Comments from '../screens/Comments/Comments'
import Profile from '../screens/Profile/Profile'
import Home from '../screens/Home/Home'
import Post from '../screens/Post/Post'
import MenuNav from '../screens/MenuNav/MenuNav';

import TabNavigation from './TabNavigation';

const Stack = createNativeStackNavigator()

function MainNavigation(){
    return(
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name='Login' 
            component={Login}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
          name='Register' 
          component={Register}
          options={{
            headerShown: false
          }}
          />
         
         <Stack.Screen
          name='TabNavigation'
          component={TabNavigation}
          options={{
            headerShown: false
          }}
          />
           <Stack.Screen 
          name='Comments' 
          component={Comments}

          />
          { <Stack.Screen 
          name='Profile' 
          component={Profile}
          options={{
            headerShown: false
          }}
          />}
           { <Stack.Screen 
          name='Post' 
          component={Post}
          options={{
            headerShown: false
          }}
          />}
          { <Stack.Screen 
          name='MenuNav' 
          component={MenuNav}
          options={{
            headerShown: false
          }}
          />}
           { <Stack.Screen 
          name='Home' 
          component={Home}
          options={{
            headerShown: false
          }}
          />}
    
          {/*<Stack.Screen name='Login'>
          {(props) => <Login {...props} metodo={metodo} />}
          </Stack.Screen>*/}
        
        </Stack.Navigator> 
    </NavigationContainer>
    )
}

export default MainNavigation