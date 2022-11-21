import React, {Component} from "react";
import  {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { db, auth } from "../../firebase/config"
import firebase from 'firebase'
import MainNavigation from "../../navigation/MainNavigation";
class MenuNav extends Component {
    constructor(props) {
    super(props);
    this.state =
        {infoUser: [],
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
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Busca aca!'
                    onChangeText={text => this.setState({busqueda: text})}
                    value={this.state.busqueda}
                />
                    <TouchableOpacity onSubmit={(event)=>this.evitarSubmit(event)} style={styles.to}>
                        <Text style={styles.bold}>Search</Text>
                    </TouchableOpacity>
              {/*  <FlatList
                data={ this.state.tendrianQueSerLosUsersQueFiltro }
                keyExtractor={ item => item.id.toString() }
                renderItem={({item}) => <Text> {item.data.owner} :  {item.data.nombreUsuario} </Text>} //RENDERIZA UN COMPONENTE POST que le paso a traves de la prop data toda la info que se guarda en items (data sale del push de doc.data
            />  */}
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