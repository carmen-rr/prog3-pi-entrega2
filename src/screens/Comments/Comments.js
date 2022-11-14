import React, {Component} from "react";
import {db, auth} from '../../firebase/config'
import  {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native'; 


class Comments extends Component {
    constructor(props){
        super(props)
        this.state={
            id:'',
            comments:[]
        }
       
    }


    componentDidMount() {
        this.setState({
            id: this.props.route.params.postId,
            comments: this.props.route.params.postData.comments,
        }, console.log(this.state))    
    }

    //creando posteos en una coleccion de firebase
    sendComment(comment){
        db.collection('posts')
        .doc(this.props.route.params.id)
        .update({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            textoDescriptivo: this.state.textoDescriptivo,
        })
        .then(()=> (this.setState({textoDescriptivo: ''}))) //que el comentario vuelva a ser vacio una vez que se envia correctamente
        .catch(err => console.log(err))
    }

    render () {
        console.log(this.state)
    return (
        <View>
            <Text>¡Add comment!</Text>

           {/* <TextInput 
                keyboardType='default'
                placeholder='Escribe tu comment...'
                onChangeText={text => this.setState({textoDescriptivo: text})} //cambia el estado del comentario
                style={styles.input}
                value={this.state.textoDescriptivo}
            /> 

                <TouchableOpacity onPress={()=> this.sendComment(this.state.textoDescriptivo) }  style={styles.button}>
                    <Text>Enviar mi comentario</Text>
                </TouchableOpacity>

    */}
    

                
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
        
        
    }, 
    backHome: {
        padding:10,
        margin: 5,
        borderColor:'black',
        borderWidth: 2,
        borderRadius:20,
        backgroundColor:'#dc143c',
        textAlign:'center',
    }
})

export default Comments; 