import React, { Component } from 'react'
import { Text , View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import {db , auth} from '../../firebase/config'

class Register extends Component {
    constructor(){
        super()
        this.state = {
            email: ' ',
            password: '',
            nombreUsuario: '',
            biografia: '',
        }
    }

    registraUsuario(email , password,){
      /*db.collection('info').add({
        owner:auth.currentUser.email,
        nombreUsuario: this.state.nombreUsuario,
        biografia: this.state.biografia,
        createdAt: Date.now(),
      })*/
      
        auth.createUserWithEmailAndPassword(email , password)
      .then(resp => {this.props.navigation.navigate('Home')})
      .catch(err => console.log(err))
    }

    render() {
        return(
            <View style={styles.container}>
                <Text  style={styles.text}>Formulario</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Escribe tu e-mail'
                    keyboardType='email-address'
                    onChangeText={ text => this.setState({email: text})}
                    value = {this.state.email}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Escribe tu contraseña'
                    keyboardType='default'
                    onChangeText={ text => this.setState({password: text})}
                    value = {this.state.password}
                    secureTextEntry={true}
                />
                 {/*<TextInput
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
                /> */}
                <View>
                    <TouchableOpacity onPress={()=> this.registraUsuario(this.state.email , this.state.password)}  style={styles.to}>
                        <Text style={styles.text}>Registrarme</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text  style={styles.text1}>Ya tienes una cuenta?</Text>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Login')}}  style={styles.to}>
                        <Text  style={styles.text}>Logueate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
    input:{
        borderWidth:2,
        height:40,
        width:'90%',
        borderRadius:20,
        borderColor:'black',
        padding:10,
        margin:10
    },
    to:{
        width:200,
        height:50,
        backgroundColor:'deepskyblue',
        textAlign:'center',
        borderRadius:40,
        alignItems:'center',
        justifyContent:'center',
        marginTop:10
    },
    container:{
        flex:1,
        backgroundColor:'orange',
        alignItems:'center',
        marginTop:35
    },
    text:{
        color:'black',
        marginTop:20,
    },
    text1:{
        textAlign:'center',
        margin:10
    }
})

export default Register




