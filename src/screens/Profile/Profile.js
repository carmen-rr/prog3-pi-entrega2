import React, {Component} from "react";
import  {View, Text, TouchableOpacity, StyleSheet} from 'react-native'; 
import {auth, db} from '../../firebase/config'

db.collection('users').onSnapshot(
    docs=>{
        let usuario = [];
        docs.forEach( doc =>{
            usuario.push({
                id: doc.id,
                data: doc.data()
            })
            this.setState({
                
            })
        })
    }
)

class Profile extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            
        }
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
        borderColor:'black',
        borderWidth: 2,
        borderRadius:20,
        backgroundColor:'#dc143c',
        textAlign:'center',



    }
})

export default Profile; 

