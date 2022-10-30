import React, { Component } from 'react'
import { Text , View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import {auth} from '../../firebase/config'

class Register extends Component {
    constructor(){
        super()
        this.state = {
            nombre: ' ',
            contrasenia: ' ',
            usuario: ' ',
            biografia: ' ',
        }
    }

    registraUsuario(email , password, usuario, biografia){
      auth.createUserWithEmailAndPassword(email , password, usuario, biografia)
      .then(resp => {this.props.navigation.navigate('Home')})
      .catch(err => console.log(err))
    }

    render() {
        return(
            <View>
                <Text>Formulario</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Escribe tu e-mail'
                    keyboardType='email-address'
                    onChangeText={ text => this.setState({nombre: text})}
                    value = {this.state.nombre}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Escribe tu contraseña'
                    keyboardType='default'
                    onChangeText={ text => this.setState({contrasenia: text})}
                    value = {this.state.contrasenia}
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Nombre de usuario'
                    keyboardType='default'
                    onChangeText={ text => this.setState({usuario: text})}
                    value = {this.state.usuario}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Escribe tu Biografia'
                    keyboardType='default'
                    onChangeText={ text => this.setState({biografia: text})}
                    value = {this.state.biografia}
                />
                <View>
                    <TouchableOpacity onPress={()=> this.registraUsuario(this.state.nombre , this.state.contrasenia , this.state.usuario , this.state.biografia)}>
                        <Text>Registrarme</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>Ya tienes una cuenta?</Text>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Login')}}>
                        <Text>Logueate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
    /*container:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:24
    },
    Preguntar xq no me funciona
    */
    
    input:{
        borderWidth: 2,
    }
})

export default Register




