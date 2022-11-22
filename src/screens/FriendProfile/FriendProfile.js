import  {View, Text, TouchableOpacity, StyleSheet, FlatList, Image} from 'react-native'; 
import React, { Component } from 'react'
import {db} from '../../firebase/config'
import OnePost from "../../components/OnePost/onePost";


export default class ProfileFriends extends Component {
    constructor(props){
        super(props)
        this.state = {
          infoUser: [],
          allPosts: []
        }
    }
    
    componentDidMount(){
      db.collection('posts').where('owner', '==', this.props.route.params.params.email).onSnapshot(docs => {
        let posts = []
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
        })
        this.setState({
          allPosts: posts,
        },
        () => console.log(this.state.allPosts)
        )
        
      })
      
      
      db.collection('user').where('owner', '==', this.props.route.params.params.email).onSnapshot(docs => {
        let users = []
        docs.forEach(doc => {
          users.push({
            id: doc.id,
            data: doc.data()
          })
        })
  
        this.setState({
          infoUser: users,
        },
        () => console.log(this.state.infoUser)
        )
      })
      
    }


    
render() {
    console.log(this.props)
    return (
      
      
      <View style={styles.container}>

                <Text style={styles.text}>{this.state.infoUser[0]?.data?.nombreUsuario}'s Profile</Text>

            
            <Text>{this.state.infoUser[0]?.data?.nombreUsuario}</Text>
            <Text>{this.props.route.params.params.email}</Text>
            <Text>{this.state.infoUser[0]?.data?.biografia}</Text>
            <Text>{this.state.allPosts.length}</Text>
            <Image style={styles.image} 
                         source={{uri:this.state.infoUser[0]?.data?.profileImage}}
                         resizeMode='contain'/>

            <FlatList
                data={ this.state.allPosts }
                keyExtractor={ item => item.id.toString() }
                renderItem={({item}) => <OnePost navigation={this.props.navigation} data={item.data} id={item.id}/>} //RENDERIZA UN COMPONENTE POST que le paso a traves de la prop data toda la info que se guarda en items (data sale del push de doc.data
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
  image: {
      height: 80,
      width: 80,
      borderRadius:400000000,
    },
  container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center', 
      backgroundColor: '#8fbc8f', 
    },
    text:{
      color:'black',
      marginTop:20,
      fontSize: 36,
      fontWeight: 'bold', 

  },
 
  
})




