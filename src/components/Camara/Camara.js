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
                .then((url) => this.props.cuandoSubaLaImagen(url))
                .catch(err => console.log(err))
            })

        })
        .catch(err => console.log(err))
    }


    rechazarImagen(){
        this.setState({
            mostrarCamara: true,
            fotoUri: '',
        })    }


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
            <Text style={styles.button}>Tomar foto</Text>
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
                    <Text style={styles.button}>Aceptar imagen</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.rechazarImagen ()}>
                    <Text style={styles.deny}>Rechazar imagen</Text>
                </TouchableOpacity>
            </View>
            : 
            <Text style={styles.text}>Necesito permisos...</Text>
        
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

    }, 
    button: {
        padding:10,
        borderWidth: 2,
        borderRadius:10,
        backgroundColor:`#8fbc8f`,
        textAlign:'center',
        margin: 10

    }, 
    deny: {
        padding:10,
        borderWidth: 2,
        borderRadius:10,
        backgroundColor:`#dc143c`,
        textAlign:'center',
        margin: 10
    }, 

    text:{
        color:'black',
        marginTop:20,
        fontSize: 36,
        alignItems:'center',

    },
    
})

export default Camara; 