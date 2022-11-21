import React, {Component} from "react";
import {db, auth} from '../../firebase/config' //importo db 
import  {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native'; 

import firebase from "firebase";

import Camara from "../../components/Camara/Camara"; //importando el componente de camara 


class Post extends Component {
    constructor(){
        super()
        this.state={
            textoDescriptivo:'', 
            mostrarCamara: true, 
            fotoUrl: '',
        }
    }

    //creando posteos en una coleccion de firebase
    enviarPost(description){ 
        db.collection('posts').add({ //coleccion de posts en la que queremos guardar documentos
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            description: description,
            comments: [], 
            likes: [], 
            foto: this.state.fotoUrl
        })
        .then(()=> (this.setState({
            textoDescriptivo: '', 
            mostrarCamara: true, //para que vuelva a posts desde sacar foto ;)
            fotoUri: '',}))) 
        .catch(err => console.log(err))
   
    }
    cuandoSubaLaImagen(url){
        this.setState({
            mostrarCamara:false,
            fotoUrl: url
        })
    }


    render () {
    return (
        <View style={styles.container}>
            {
                    this.state.mostrarCamara ? 
                 <Camara navigation={this.props.navigation}  cuandoSubaLaImagen= {(url) => this.cuandoSubaLaImagen(url)}/> 
                
                    : 
    
                <View>

            <TextInput 
                keyboardType='default'
                placeholder='Escribe tu texto descriptivo...'
                onChangeText={text => this.setState({textoDescriptivo: text})} //cambia el estado del comentario
                style={styles.input}
                value={this.state.textoDescriptivo}
            /> 

                <TouchableOpacity onPress={()=> this.enviarPost(this.state.textoDescriptivo) }  style={styles.button}>
                    <Text style={styles.bold}>Enviar mi nueva publicación</Text>
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
        backgroundColor: '#dcdcdc', 
    },
    button: {
        padding:10,
        borderWidth: 2,
        borderRadius:10,
        backgroundColor:`#9370db`,
        textAlign:'center',
        margin: 10, 
        
    },
    bold:{
        fontWeight: 'bold'

    }
    
})

export default Post; 

