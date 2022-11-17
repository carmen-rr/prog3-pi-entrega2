import React, {Component} from "react";
import  {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native'; 
import {auth, db} from '../../firebase/config'
import OnePost from "../../components/OnePost/onePost";



class Profile extends Component {
    constructor(props){
      super(props)
      this.state ={
        allPosts: [],
        infoUser: [],
      }
    }


    signOut(){
        auth.signOut()
        this.props.navigation.navigate('Login')
    }

 
    componentDidMount(){
        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(docs => {
          let posts = []
          docs.forEach(doc => {
            posts.push({
              id: doc.id,
              data: doc.data()
            })
          })
          this.setState({
            allPosts: posts
          })
          
        })
    
        db.collection('user').where('owner', '==', auth.currentUser.email).onSnapshot(docs => {
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
          () => console.log(this.state.infoUser[0].data)
          )
        })
    
        
      }
    
      

    componentWillUnmount(){
    db.collection('users').onSnapshot(
        docs=>{
            let usuario = [];
            docs.forEach( doc =>{
                usuario.push({
                    id: doc.id,
                    data: doc.data()
                })
                this.setState({
                    
                })
            })
        }
    )
    }
    

    
    render () {
    return (

        <View>
            <Text>Estructura basica de: Profile</Text>
            <Text>{auth.currentUser.email}</Text>
            <FlatList
            data={ this.state.infoUser }
            keyExtractor={ item => item.id.toString() }
            renderItem={({item}) => 
            
            <Text>{item.data.biografia}  </Text>
            
            
            }

            />
            <TouchableOpacity onPress={ () => this.signOut()} style={styles.button}>
                <Text>Cerrar sesión</Text>
            </TouchableOpacity>
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
    image: {
        height: 400,
        width: 400
      },
   
    
})



export default Profile; 

