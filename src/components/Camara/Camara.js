import { Camera } from 'expo-camera'
import React, {Component} from "react";
import  {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'; 

class Camara extends Component {
    constructor (){
        super()
        this.metodosDeCamara = null, 
        this.state = {
            mostrarCamara : false, 
            fotoUri: ''
        }
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then (()=> {
            this.setState({
                mostrarCamara : true
            })
        })
        .catch(err => console.log(err))
    }

    tomarFoto(){
        this.metodosDeCamara.takePictureAsync()
        .then(foto => this.setState({
            fotoUri: foto.uri,
            mostrarCamara: false
        }))
        .catch(err => console.log(err))
    }
      
    render () {
    return (
        <View style={styles.container}>

            {
                this.state.mostrarCamara ? 
            <>

            <Camera 
            style={styles.cameraBody}
            type={Camera.Constants.Type.back}
            ref={metodos => this.metodosDeCamara = metodos}
            />
    
            <TouchableOpacity onPress={() => this.tomarFoto()}>
            <Text>Tomar foto</Text>
            </TouchableOpacity>
            </>

            :
            this.state.mostrarCamara === false && this.state.fotoUri != '' ?
            <View>
                <Image
                source={{uri: this.state.fotoUri}}
                style={styles.imagen}
                />
            </View>
            : 
            <Text>Necesito permisos</Text>
        
        }
        </View>
    )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    cameraBody:{
        height: 500,
    },
    imagen:{
        height: 200,

    }
})

export default Camara; 