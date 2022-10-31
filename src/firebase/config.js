import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAYJ5mdub-llOT8FzvvekryQ_MDyNAan0g",
    authDomain: "proyectofinal-f7037.firebaseapp.com",
    projectId: "proyectofinal-f7037",
    storageBucket: "proyectofinal-f7037.appspot.com",
    messagingSenderId: "9915226844",
    appId: "1:9915226844:web:53929a8184ebc1b14c7219"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();