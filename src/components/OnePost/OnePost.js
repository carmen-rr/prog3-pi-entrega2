import React, {Component} from "react";
import  {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'; 
import {FontAwesome} from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'; 
import {db, auth} from '../../firebase/config'

import firebase from "firebase"; //modulo
import Camara from "../Camara/Camara";


class OnePost extends Component {
    constructor(props){
        super(props)
        this.state = {
         //likesCantidad : props.data.likes.length, //length para tener la cantidad total NO SE PORQUE NO ME LO LEE!!!!!!
         //commentsCantidad : props.data.comments.length, //length para tener la cantidad total 
           isMyLike: false, 

        }

    }


    componentDidMount(){
        //let milike = this.props.data.likes.includes(auth.currentUser.email) //includes se fija si esta presente el like 
        /*if(milike){
            this.setState({
            isMyLike:true
            })
        }*/
    }
    

    //CUANDO VOY A FIREBASE ME TIENE QUE DECIR QUIEN LIKEO Y QUIEN DISLIKEO

    like(){

        db.collection('posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) //forma de actualizar arrays en firebase 
        })
        .then(()=> 
        this.setState({
            isMyLike : true,
            likesCantidad: this.state.likesCantidad + 1
        }))
        .catch(err => console.log(err))



    }

    unlike(){
        db.collection('posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) //forma de actualizar arrays en firebase 
        })
        .then(()=> 

        this.setState({
            isMyLike : false,
            likesCantidad: this.state.likesCantidad - 1

        }))
    .catch(err => console.log(err))
    }



    render () {
        console.log(this.props);
        return (
            <View style={styles.container}>

                <View style={styles.profileName}>
                    <TouchableOpacity onPress={ ()=> this.props.navigation.navigate('Profile')}>
                        <Text>Creator: {this.props.data.owner}</Text>
                    </TouchableOpacity>
                </View>


                <Image style={styles.image} 
                         source={{uri:this.props.data.foto}}
                         resizeMode='contain'/>

                <Text>{this.props.data.description}</Text>
                <View>
                    <Text>{this.state.likesCantidad}</Text>
                {
                    this.state.isMyLike ?
                    
                <TouchableOpacity onPress={()=> this.unlike()}>
                    <FontAwesome name='paw' color='#f08080' size={25}/>
                </TouchableOpacity>
    
                :
    
                <TouchableOpacity onPress={()=> this.like()}>
                    <Ionicons name="paw-outline" size={25} color="#f08080" />
                </TouchableOpacity>
                    
                }
                </View>
              
                <View>
                {/*touchable opacity que se encarga de hacer la navegacion, este ya tiene las props de navegacion que trae de home */}
                    <TouchableOpacity onPress={ ()=> this.props.navigation.navigate('Comments', {postData: this.props.data, postId: this.props.id})} style={styles.button}>
                        <Text>Agregar comment</Text>
                    </TouchableOpacity>
                </View>
    
    
                
            </View>
        )
        }
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#fffff0',
        },
        profileName: {
            fontWeight: 'bold'        },
        image: {
         height: 400,
         width: 400
       },
       button: {
        borderColor:'black',
        backgroundColor:'#48d1cc',
        textAlign:'right',
        alignItems: 'center',
        padding:5,
        borderColor:'black',
        borderWidth: 2,

       }
     })

     
export default OnePost; 

