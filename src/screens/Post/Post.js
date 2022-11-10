import React, {Component} from "react";
import {db, auth} from '../../firebase/config'
import  {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native'; 

import Camara from "../../components/Camara/Camara"; //importando el componente de camara 


class Post extends Component {
    constructor(){
        super()
        this.state={
            textoDescriptivo:'', 
            mostrarCamara: true
        }
    }

    //creando posteos en una coleccion de firebase
    sendComment(comment){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            textoDescriptivo: this.state.textoDescriptivo,
        })
        .then(()=> (this.setState({textoDescriptivo: ''}))) //que el comentario vuelva a ser vacio una vez que se envia correctamente
        .catch(err => console.log(err))
    }

    render () {
    return (
        <View style={styles.container}>
            {
                this.state.mostrarCamara ? 
                <Camara /> 
                
                : 
                
                <View>

            <TextInput 
                keyboardType='default'
                placeholder='Escribe tu texto descriptivo...'
                onChangeText={text => this.setState({textoDescriptivo: text})} //cambia el estado del comentario
                style={styles.input}
                value={this.state.textoDescriptivo}
            /> 

                <TouchableOpacity onPress={()=> this.sendComment(this.state.textoDescriptivo) }  style={styles.button}>
                    <Text>Enviar mi nueva publicación</Text>
                </TouchableOpacity>


                </View>

            }

           
        </View>
    )
    }
}


const styles =StyleSheet.create ({
    container : {
        flex:1 
    },
    input: {
        height: 60, 
        borderWidth: 1, 
        margin: 5,
        borderRadius: 10,
        textAlign:'center',




    },
    button: {
        padding:10,
        borderColor:`#5f9ea0`,
        borderWidth: 2,
        borderRadius:20,
        backgroundColor:`#5f9ea0`,
        textAlign:'center',
        
        
    }
})

export default Post; 

