import React, {Component} from "react";
import  {View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList} from 'react-native';
import { db, auth } from "../../firebase/config"
import firebase from 'firebase'
import MainNavigation from "../../navigation/MainNavigation";



class MenuNav extends Component {
    constructor(props) {
    super(props);
    this.state ={
        infoUser: [],
        filtrado: [],
        perfilRedirect: 'FriendProfile'
       
        };
    }
    componentDidMount(){
        db.collection('user').onSnapshot(docs => {
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
   
    evitarSubmit(event) {
        event.preventDefault();
    
    }


    controlarCambios(event) {
        this.setState({valor: event.target.value}, ()=> this.props.metodoQueBusca(this.state.valor));
    }
    
 buscador(usuarioBuscado){
        let  resultadoBusqueda = this.state.infoUser.filter((item)=>{
        return item.data.owner.includes(usuarioBuscado)
        })
        this.setState({filtrado: resultadoBusqueda})
      }  
    
        

 buscarData(valor) {

    let userFiltrado = this.state.backup.filter(elm => {
      if (elm.data.email.toLowerCase().includes(valor)) {
        return elm
      }
    })

    this.setState({ buscar: valor })
    if (userFiltrado.length > 0) {

      this.setState({
        guardarValor: userFiltrado,
      })
    }
     else {
      this.setState({
        mensaje: 'No encontramos a tu amigo :(',
        guardarValor: [],
      })
    }
  }
      

    
    render() {
        console.log(this.state.infoUser);
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Busca aca!'
                    onChangeText={(text) => this.buscador(text)}
                    value={this.state.busqueda}
                />
                    <TouchableOpacity onSubmit={(event)=>this.evitarSubmit(event)} style={styles.to}>
                        <Text style={styles.bold}>Search</Text>
                    </TouchableOpacity>
              {/*  <FlatList
                    data={this.state.filtrado.data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Text> {this.state.infoUser}</Text>} 
                 />
        */}

                        <FlatList
                        data={this.state.filtrado}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => 
                            
                        <TouchableOpacity onPress={ ()=> this.props.navigation.navigate(
                            this.state.perfilRedirect, 
                            {
                                params:{
                                    email: item.data.owner
                                }
                            }
                            )}>
                            <Text> {item.data.owner} ({item.data.nombreUsuario})</Text>
                        </TouchableOpacity>
                    
                    } 
                            
                    
                    />
            
            </View>
        );
        }
       }
       const styles = StyleSheet.create({
        container:{
            flex:1,
            justifyContent:'center',
            alignItems:'center', 
            backgroundColor: '#8fbc8f', 
          },
        input:{
            borderWidth:2,
            height:40,
            width:'90%',
            borderRadius:20,
            borderColor:'black',
            padding:10,
            margin:10
        },
        to:{
            width:200,
            height:50,
            margin: 5,
            backgroundColor:'#9370db',
            textAlign:'center',
            borderRadius:40,
            alignItems:'center',
            justifyContent:'center',
            marginTop:10, 
            borderColor:'black',
            borderWidth:2,
        
        },
        bold:{
            fontWeight: 'bold'
    
        }
})
    export default MenuNav