import { View, Text } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
<<<<<<< HEAD

import TabNavigation from './TabNavigation';

const Stack = createNativeStackNavigator()

=======
import Home from '../screens/Home/Home';

const Stack = createNativeStackNavigator()


>>>>>>> 1cf19179a2f11aadb0d93e5bfdd65ed569131039
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
<<<<<<< HEAD
         <Stack.Screen
          name='TabNavigation'
          component={TabNavigation}
=======
          <Stack.Screen
          name='Home'
          component={Home}
>>>>>>> 1cf19179a2f11aadb0d93e5bfdd65ed569131039
          options={{
            headerShown: false
          }}
          />
    
          {/*<Stack.Screen name='Login'>
          {(props) => <Login {...props} metodo={metodo} />}
          </Stack.Screen>*/}
        
        </Stack.Navigator> 
    </NavigationContainer>
    )
}

export default MainNavigation