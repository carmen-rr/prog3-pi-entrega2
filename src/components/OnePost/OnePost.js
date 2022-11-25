import React, {Component} from "react";
import  {View, Text, TouchableOpacity, StyleSheet, Image, FlatList} from 'react-native'; 
import {FontAwesome} from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'; 
import {db, auth} from '../../firebase/config'

import firebase from "firebase"; //modulo


class OnePost extends Component {
    constructor(props){
        super(props)
        this.state = {
            likesCantidad : props.data.likes.length, //length para tener la cantidad total
            commentsCantidad : props.data.comments.length, //length para tener la cantidad total 
            isMyLike: false, 
            comments: props.data.comments,
            
            perfilRedirect: 'FriendProfile'
        }

    }


    componentDidMount(){
        let milike = this.props.data.likes.includes(auth.currentUser.email) //includes se fija si esta presente el like 
        if(milike){
            this.setState({
            isMyLike:true
            })
        }

        if ( this.props.data.owner == auth.currentUser.email){
            this.setState({
                perfilRedirect: 'Profile'
            })
        }
    }
    

    //en firebase me dice quien likeo y quien dislikeo

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

                <View>
                    <TouchableOpacity onPress={ ()=> this.props.navigation.navigate(
                        this.state.perfilRedirect, 
                        {
                            params:{
                                email: this.props.data.owner
                            }
                        }
                        )}>
                        <Text style={styles.bold}>Creator: {this.props.data.owner}</Text>
                    </TouchableOpacity>
                </View>


                <Image style={styles.image} 
                         source={{uri:this.props.data.foto}}
                         resizeMode='contain'/>

                 <View style={styles.container2}>

                    <Text>{this.props.data.description}</Text>

                <View >
                    <Text>{this.state.likesCantidad}</Text>
                {
                    this.state.isMyLike ?
                
                    
                <TouchableOpacity onPress={()=> this.unlike()}>
                    <FontAwesome name='paw' color='#8b008b' size={35}/>
                </TouchableOpacity>
    
                :
    
                <TouchableOpacity onPress={()=> this.like()}>
                    <Ionicons name="paw-outline" size={35} color="#8b008b"  />
                </TouchableOpacity>
                    
                }
                </View>
              
                <View>
                    <Text>Cantidad de comments : {this.state.commentsCantidad}</Text>
                {/*touchable opacity que se encarga de hacer la navegacion, este ya tiene las props de navegacion que trae de home */}
                    <TouchableOpacity onPress={ ()=> this.props.navigation.navigate('Comments', {postData: this.props.data, postId: this.props.id})} style={styles.button}>
                        <Text style={styles.bold}>Agregar comment</Text>
                    </TouchableOpacity>

                </View>

                </View>
    
                    <FlatList
                    data={ this.state.comments.slice(0,4)}
                    keyExtractor={ item => item.comments.toString() }
                    renderItem={({item}) => <Text> {item.comments}</Text>} 
                    /> 
                
            </View>
        )
        }
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#d3d3d3',
            margin: 5,
            borderRadius: 20,
            padding: 10, 
            width: 520, 
            borderColor: '#4b0082',


        },
        container2: {
            backgroundColor: '#f8f8ff',
            borderRadius: 10,
            margin: 5,
        },
       
        image: {
            borderColor: "black",
            borderRadius: 20,
            borderWidth: 5,
            height: 400,

       },
       button: {
        borderColor:'black',
        backgroundColor:'#3cb371',
        alignItems: 'center',
        padding:5,
        borderColor:'black',
        borderWidth: 2,
        borderRadius: 10,
        margin: 2,



       }, 
       bold:{
        fontWeight: 'bold', 
        fontSize: 15,
        color: '#4b0082'

    }
      
     })

     
export default OnePost; 

