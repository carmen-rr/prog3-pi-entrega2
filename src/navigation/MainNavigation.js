import { View, Text } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import Home from '../screens/Home/Home';

const Stack = createNativeStackNavigator()


function MainNavigation(){
    return(
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name='Login' 
            component={Login}
          />
          <Stack.Screen 
          name='Register' 
          component={Register}
          />
          <Stack.Screen
          name='Home'
          component={Home}
          />
    
          {/*<Stack.Screen name='Login'>
          {(props) => <Login {...props} metodo={metodo} />}
          </Stack.Screen>*/}
        
        </Stack.Navigator> 
    </NavigationContainer>
    )
}

export default MainNavigation