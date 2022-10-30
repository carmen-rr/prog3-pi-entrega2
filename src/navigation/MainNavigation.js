import { View, Text } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../src/screens/Login/Login'
import Register from '../src/screens/Register/Register'

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
    
          {/*<Stack.Screen name='Login'>
          {(props) => <Login {...props} metodo={metodo} />}
          </Stack.Screen>*/}
        
        </Stack.Navigator> 
    </NavigationContainer>
    )
}

export default MainNavigation