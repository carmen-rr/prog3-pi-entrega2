import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../../firebase/config' 


class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:''
        }
    }

    loguear(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then(resp => {this.props.navigation.navigate('Home')})
        .catch(err => console.log(err))
    }

    render(){
        return (
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
                        <Text>Log In</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Register')}>
                        <Text>Registrate</Text>
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