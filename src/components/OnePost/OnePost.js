import React, {Component} from "react";
import  {View, Text, TouchableOpacity} from 'react-native'; 
import {FontAwesome} from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'; 
import {db, auth} from '../../firebase/config'

import firebase from "firebase"; //modulo


class OnePost extends Component {
    constructor(props){
        super(props)
        this.state = {
           // likesCantidad : props.data.likes.length, //length para tener la cantidad total NO SE PORQUE NO ME LO LEE!!!!!!
           // commentsCantidad : props.data.comments.length, //length para tener la cantidad total 
           isMyLike: false, 

        }

    }

/*
    componentDidMount(){
        let milike = this.props.data.likes.includes(auth.currentUser.email) //includes se fija si esta presente el like 
        if(milike){
            this.setState({
            isMyLike:true
            })
        }
    }
    */
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
        return (
            <View>
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
    
    
                
            </View>
        )
        }
    }

export default OnePost; 

