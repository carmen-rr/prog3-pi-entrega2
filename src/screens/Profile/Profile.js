import React, {Component} from "react";
import  {View, Text, TouchableOpacity, StyleSheet, FlatList, Image} from 'react-native'; 
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

    eliminar(){
      db.collection('user')
      .doc(this.state.infoUser[0].id)
      .delete().then(()=>console.log('hizo el delete'))
      .then(()=> auth.currentUser.delete())
      .then(()=> this.props.navigation.navigate('Login'))
      .catch((e)=>console.log(e))
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
            allPosts: posts,
          },
          () => console.log(this.state.allPosts)
          )
          
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
          () => {console.log(this.state.infoUser)
                 console.log('este es el perfil')
          }
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
      console.log(this.state.allPosts)
    return (

        
        <View style={styles.container}>

                <Text style={styles.text}>You're Profile</Text>

            <Text>{this.state.infoUser[0]?.data?.nombreUsuario}</Text>
            <Text>{auth.currentUser.email}</Text>
            <Text>{this.state.infoUser[0]?.data?.biografia}</Text>
            <Text>{this.state.allPosts.length}</Text>
            <Image style={styles.image} 
                         source={{uri:this.state.infoUser[0]?.data?.profileImage}}
                         resizeMode='contain'/>

            
                  
            <TouchableOpacity onPress={ () => this.signOut()} style={styles.button}>
                <Text>Cerrar sesión</Text>
            </TouchableOpacity>

           <TouchableOpacity onPress={ () => this.eliminar()} style={styles.button}>
                <Text>Eliminar perfil</Text>
           </TouchableOpacity>

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
        margin: 5
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
        fontWeight: 'bold'


    },

    
})



export default Profile; 

