import React, {Component} from "react";
import  {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native'; 
import {auth, db} from '../../firebase/config'

import OnePost from "../../components/OnePost/onePost";


class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            allPosts : [], 
        }
    }

    //obteniendo los comentarios 

    
    componentDidMount(){
        db.collection('posts').onSnapshot(docs => {
        let posts = []
        docs.forEach (doc => {
            posts.push({
                id: doc.id, 
                data: doc.data(), 

            })
         })
         this.setState(
            {
            allPosts : posts})
         
        })
    }
//paso componente posts al flatlist

    render () {
    return (
        <View style={styles.container1}>
            <Text>Estructura basica de: Home</Text>

            <FlatList
                data={ this.state.allPosts }
                keyExtractor={ item => item.id.toString() }
                renderItem={({item}) => <OnePost data={item.data} id={item.id}/>} //RENDERIZA UN COMPONENTE POST que le paso a traves de la prop data toda la info que se guarda en items (data sale del push de doc.data
            />  
        
        </View>
    )
    }
}

const styles = StyleSheet.create({
    button:{
        padding:10,
        borderColor:'black',
        borderWidth: 2,
        borderRadius:20,
        backgroundColor:'#dc143c',
        textAlign:'center',
    }, 
    container1:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },

    }
)

export default Home; 
