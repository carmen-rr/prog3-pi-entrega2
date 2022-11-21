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
        console.log(this.state?.data?.comments?.length) //estos signos que se le ponen a la ultima propiedad quieren decir que este dato puede estar o no pero si no estan no rompen 
    return (
        <View style={styles.container1}>
          
        {
            this.state?.data?.comments?.length >= 1 ? //si data tiene la propiedad comments renderizame la flatlist
            <View>
            <Text style={styles.text}>¡Agrega tu comment!</Text>
            <FlatList style={styles.flat}
            data={ this.state.data.comments.sort((a,b) => a.createdAt - b.createdAt).reverse()} //sort ordena de menor a mayor los elementos de un arrya, array que recorre los comments :)
            keyExtractor={ item => item.createdAt.toString() }
            renderItem={({item}) => <Text>{item.owner} : {item.comments}</Text>} //informacion que tiene del post que le paso a traves de la prop data toda la info que se guarda en items (data sale del push de doc.data)
        />
        </View>
        : <Text style={styles.text}>¡Aún no hay comentarios. Sé el primero en opinar!</Text>
    }
            

            <TextInput 
                keyboardType='default'
                placeholder='Escribe tu comment...'
                onChangeText={text => this.setState({comments: text})} //cambia el estado del comentario
                style={styles.input}
                value={this.state.comments}
            /> 

                <TouchableOpacity onPress={()=> this.sendComment(this.state.comments, this.state.id) }  style={styles.button}>
                    <Text style={styles.bold} >Enviar mi comentario</Text>
                </TouchableOpacity>

                
        </View>
    )
    }
}


const styles =StyleSheet.create ({
    container1:{
        backgroundColor: '#8fbc8f', 
        flex: 1
      },
    input: {
        height: 60, 
        borderWidth: 1, 
        margin: 20,
        borderRadius: 10,
        textAlign:'center',
        backgroundColor:`#dcdcdc`,


    },
    button: {
        padding:10,
        borderWidth: 2,
        borderRadius:10,
        backgroundColor:`#9370db`,
        textAlign:'center',
        margin: 20,
        fontWeight: 'bold'

    }, 
    text:{
        color:'black',
        marginTop:20,
        fontSize: 36,
        alignSelf: 'center'

    },
    flat: {
        margin: 30
    }, 
    bold:{
        fontWeight: 'bold'

    }
   
})

export default Comments; 
