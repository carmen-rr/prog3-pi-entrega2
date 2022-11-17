import React, {Component} from "react";
import {db, auth} from '../../firebase/config'
import  {View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList} from 'react-native'; 
import firebase from "firebase";


class Comments extends Component {
    constructor(props){
        super(props)
        this.state={
            id:'',
            comments:'', 
            data: {}, 
            mensajeComentario: false, 
           // commentsCantidad : props.postData.comments.length, //length para tener la cantidad total 



        }
       
    }

    componentDidMount() {
        db.collection('posts')
        .doc(this.props.route.params.postId)
        .onSnapshot(doc => {
            this.setState({
                id: doc.id,
               data: doc.data(),
            }, ()=> console.log(this.state.data)) 
        })    
    }

    //como comments es un array tengo que estar agregandole esos elementos al array 
    //ESTA MUY MAL LA PRACTICA DE NO PONER UN PARAMETRO EN SEND COMMENT?

    
    sendComment(){

        if (this.state.comments != ''){
        db.collection('posts')
        .doc(this.state.id)
        .update({
            comments: firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.email,
                comments: this.state.comments,
                createdAt: Date.now(),


            }),
        })
        .then(()=> (this.setState({comments: ''}))) //que el comentario vuelva a ser vacio una vez que se envia correctamente
        .catch(err => console.log(err))
    }
    }

   
    render () {
        console.log(this.state)
        console.log(this.state?.data?.comments?.length) //estos signos no se le ponen a la ultima propiedad, este dato puede estar o no pero si no estan no rompen 
    return (
        <View>
          
        {
            this.state?.data?.comments?.length >= 1 ? //si data tiene la propiedad comments renderizame la flatlist
            <View>
            <Text>¡Agrega tu comment!</Text>
            <FlatList
            data={ this.state.data.comments.sort((a,b) => a.createdAt - b.createdAt).reverse()} //sort ordena de menor a mayor los elementos de un arrya, array que recorre los comments :)
            keyExtractor={ item => item.createdAt.toString() }
            renderItem={({item}) => <Text>{item.owner} : {item.comments}</Text>} //RENDERIZA UN COMPONENTE POST que le paso a traves de la prop data toda la info que se guarda en items (data sale del push de doc.data
        />
        </View>
        : <Text>¡Aún no hay comentarios. Sé el primero en opinar!</Text>
    }
            


            <TextInput 
                keyboardType='default'
                placeholder='Escribe tu comment...'
                onChangeText={text => this.setState({comments: text})} //cambia el estado del comentario
                style={styles.input}
                value={this.state.comments}
            /> 

                <TouchableOpacity onPress={()=> this.sendComment(this.state.comments, this.state.id) }  style={styles.button}>
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
        margin: 10,
        borderRadius: 10,
        textAlign:'center',
        backgroundColor:`#d2b48c`,





    },
    button: {
        padding:10,
        borderWidth: 2,
        borderRadius:10,
        backgroundColor:`#66cdaa`,
        textAlign:'center',
        borderColor:'black',
        margin: 10

        
        
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


/*componentDidMount() {
        this.setState({
            id: this.props.route.params.postId,
            comments: this.props.route.params.postData.comments,
        }, console.log(this.state))    
    } */