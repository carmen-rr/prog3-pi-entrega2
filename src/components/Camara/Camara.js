import { Camera } from 'expo-camera'
import React, {Component} from "react";
import  {View, Text} from 'react-native'; 

class Camara extends Component {

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
          .then(()=>{
               this.setState({
                   permission: true,
               })
          })
          .catch( e => console.log(e))          
      }
      
    render () {
    return (
        <View>
            <Text>Estructura basica de: MenuNav</Text>
        </View>
    )
    }
}

export default Camara; 