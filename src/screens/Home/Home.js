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

    componentDidMount(){
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(docs => {
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

    render () {
    return (
        <View style={styles.container1}>
            <Text style={styles.text}>Welcome Home</Text>

            <FlatList
                data={ this.state.allPosts }
                keyExtractor={ item => item.id.toString() }
                renderItem={({item}) => <OnePost navigation={this.props.navigation} data={item.data} id={item.id}/>} //RENDERIZA UN COMPONENTE POST que le paso a traves de la prop data toda la info que se guarda en items (data sale del push de doc.data)
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
      text:{
        color:'black',
        marginTop:20,
        fontSize: 36,
        margin: 15
    },
    }
)

export default Home; 
