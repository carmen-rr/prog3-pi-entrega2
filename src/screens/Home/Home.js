import React, {Component} from "react";
import  {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native'; 
import {auth, db} from '../../firebase/config'

class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            allPosts : []
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
            allPosts : posts}, () => console.log(this.state.allPosts))
         
        })
    }
//paso componente posts al flatlist

    render () {
    return (
        <View>
            <Text>Estructura basica de: Home</Text>

            <FlatList
                data={ this.state.allPosts }
                keyExtractor={ item => item.id.toString() }
                renderItem={({item}) => <Text>{item.data.textoDescriptivo}</Text>}
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
    }

    }
)

export default Home; 
