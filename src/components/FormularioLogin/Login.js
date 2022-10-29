import React, { Component } from 'react'
import { Text , View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import {auth} from '../../firebase/config'

class Login extends Component{
    
    constructor(){
        super()
        this.state = {
            email: '',
            password: ''
        }
    }
    
    loguear(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then(resp => console.log(resp))
        .catch(err => console.log(err))
    }
    
    render(){
        return(
            <View>
                <Text>Login</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='email-adress'
                    placeholder='Ingresa tu e-mail'
                    onChangeText={text => this.setState({email: text})}
                    value={this.state.email}

                />
                 <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Ingresa tu password'
                    onChangeText={text => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <View>
                    <TouchableOpacity onPress={()=> this.loguear(this.state.email, this.state.password)}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    input:{
        borderWidth:1
    }
})

export default Login 