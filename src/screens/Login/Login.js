import { Text, View, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../../firebase/config' 



class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:'',
            mensajeError:'',
            validacionCompleta: false
        }
    }

    loguear(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then(resp => {this.props.navigation.navigate('TabNavigation')})
        .catch(err => this.setState({mensajeError: err.message}))
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
          if(user !== null){
            this.props.navigation.navigate('TabNavigation')
          } else {
            this.setState({validacionCompleta: true})
          }
        })
      }

    render(){
        return ( 
            this.state.validacionCompleta ?      
                <View style={styles.container}>
                <Text style={styles.text}>Login</Text>
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
                
                <Text>{this.state.mensajeError}</Text>

                <View>
                    <TouchableOpacity onPress={()=> this.loguear(this.state.email, this.state.password)} style={styles.to} disabled={this.state.email.length >=1 && this.state.password.length >= 1?false:true}>
                        <Text>Log In</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Register')} style={styles.to}>
                        <Text>Registrate</Text>
                    </TouchableOpacity>
                </View>
            
            </View>
                :  
              <View style={styles.activityContainer}>
                <ActivityIndicator size='large' color='green'/>
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
    activityContainer:{
        justifyContent:'center',
        flex:1
    }
})

export default Login 