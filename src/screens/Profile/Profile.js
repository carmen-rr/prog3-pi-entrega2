import React, {Component} from "react";
import  {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native'; 
import {auth, db} from '../../firebase/config'

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

class Profile extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            allPosts : []
        
        }
    }
    signOut(){
        auth.signOut()
        this.props.navigation.navigate('Login')
    }

    //Que se vean todos los posts del usuario
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

    

    
    render () {
    return (
        <View>
            <Text>Estructura basica de: Profile</Text>
            <TouchableOpacity onPress={ () => this.signOut()} style={styles.button}>
                <Text>Cerrar sesión</Text>
            </TouchableOpacity>

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
})

export default Profile; 

