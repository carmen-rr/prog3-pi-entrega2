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

   /* eliminar(){
        db.collection('users').doc
        .delete(

        ).then(()=> 
        this.props.navigation.navigate('Register'))
        
    }*/

 
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
          () => console.log(this.state.infoUser)
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

        
        <View style={styles.container}>
            
            <Text>{this.state.infoUser[0]?.data?.nombreUsuario}</Text>
            <Text>{auth.currentUser.email}</Text>
            <Text>{this.state.infoUser[0]?.data?.biografia}</Text> 
            <Image style={styles.image} 
                         source={{uri:this.state.infoUser[0]?.data?.profileImage}}
                         resizeMode='contain'/>
            
                  
            <TouchableOpacity onPress={ () => this.signOut()} style={styles.button}>
                <Text>Cerrar sesión</Text>
            </TouchableOpacity>

           {/* <TouchableOpacity onPress={ () => this.eliminar()} style={styles.button}>
                <Text>Eliminar perfil</Text>
    </TouchableOpacity>*/}

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
    container1:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
   
    
})



export default Profile; 

