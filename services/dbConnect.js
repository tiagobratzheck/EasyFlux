import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCmJGo49UqlY7iiSETIUjCN_lRcxhAA87s",
    authDomain: "easyflux-d0f92.firebaseapp.com",
    projectId: "easyflux-d0f92",
    storageBucket: "easyflux-d0f92.appspot.com",
    messagingSenderId: "1042043743132",
    appId: "1:1042043743132:web:63baa2a9d0ef3bda9f3659"
};

const firebaseApp =
    !firebase.apps.length ?
        firebase.initializeApp(firebaseConfig) :
        firebase.app();

const db = firebaseApp.firestore()

export default db;