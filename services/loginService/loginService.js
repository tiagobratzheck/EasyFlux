import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase';


export const login = (email, senha, checked) => {
    return new Promise((resolve, reject) => {
        if (!checked) {
            AsyncStorage.removeItem("email")
            AsyncStorage.removeItem("senha")
        }
        console.log(email)
        firebase.auth().signInWithEmailAndPassword(email, senha).then(() => {
            if (checked) {
                AsyncStorage.setItem("email", email)
                AsyncStorage.setItem("senha", senha)
            }
            resolve()
        })
            .catch((erro) => {
                reject(erro.message)
            })
    })
}


export const createUser = (email, password) => {
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            resolve()
        }).catch((erro) => {
            reject(erro.message)
        })
    })
}


export const logout = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().signOut().then(() => {
            resolve()
        }).catch((err) => {
            reject(err.message)
        })
    })
}