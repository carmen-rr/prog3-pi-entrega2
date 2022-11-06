import React, {Component} from "react";
import {db, auth} from '../../firebase/config'
import  {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native'; 


class Post extends Component {
    constructor(){
        super()
        this.state={
            comment:''
        }
    }

    //creando posteos en una coleccion de firebase
    sendComment(comment){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            date: Date.now,
            comment: this.state.comment,
        })
        .then(()=> (this.setState({comment: ''}))) //que el comentario vuelva a ser vacio una vez que se envia correctamente
        .catch(err => console.log(err))
    }

    render () {
    return (
        <View>
            <Text>¡Crea tu posteo!</Text>

            <TextInput 
                keyboardType='default'
                placeholder='Escribi tu comentario...'
                onChangeText={text => this.setState({comment: text})} //cambia el estado del comentario
                style={styles.input}
                value={this.state.comment}
            /> 

                <TouchableOpacity onPress={()=> this.sendComment(this.state.comment) }  style={styles.button}>
                    <Text>Enviar mi comentario</Text>
                </TouchableOpacity>

                
        </View>
    )
    }
}


const styles =StyleSheet.create ({
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

