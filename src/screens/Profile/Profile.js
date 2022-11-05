import React, {Component} from "react";
import  {View, Text, TouchableOpacity, StyleSheet} from 'react-native'; 
import {auth} from '../../firebase/config'

class Profile extends Component {
    
    constructor(props){
        super(props)
    }
    signOut(){
        auth.signOut()
        this.props.navigation.navigate('Login')
    }
    
    render () {
    return (
        <View>
            <Text>Estructura basica de: Profile</Text>
            <TouchableOpacity onPress={ () => this.signOut()} style={styles.button}>
                <Text>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    )
    }
}

const styles = StyleSheet.create({
    button:{
        padding:10,
        borderColor:'red',
        borderWidth: 2
    }
})

export default Profile; 