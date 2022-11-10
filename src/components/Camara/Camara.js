import { Camera } from 'expo-camera'
import React, {Component} from "react";
import  {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'; 
import {storage} from '../../firebase/config'

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
      

    aceptarImagen(){
        fetch (this.state.fotoUri)
        .then(imagenEnBinario => imagenEnBinario.blob())
        .then(imagen => {
            const ref = storage.ref(`fotos/${Date.now()}.jpg`)
            ref.put(imagen)
            .then (()=> {
                ref.getDownloadURL()
                .then((url) => console.log(url))
                .catch(err => console.log(err))
            })

        })
        .catch(err => console.log(err))
    }

    rechazarImagen(){

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
                <TouchableOpacity onPress={()=> this.aceptarImagen ()}>
                    <Text>Aceptar imagen</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.rechazarImagen ()}>
                    <Text>Rechazar imagen</Text>
                </TouchableOpacity>
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