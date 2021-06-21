import firebase from '../dbConnect';
import 'firebase/firestore'


export const getRegister = (currentDate) => {
    return new Promise((resolve, reject) => {
        firebase.collection('registers').doc(currentDate).get().then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const saveRegister = (date, data) => {
    return new Promise((resolve, reject) => {
        firebase.collection('registers').doc(date).set(data).then(() => {
            resolve()
        }).catch((err) => {
            reject(err)
        })
    })
}

export const updateRegister = (date, data) => {
    return new Promise((resolve, reject) => {
        firebase.collection('registers').doc(date).update(data).then(() => {
            resolve()
        }).catch((err) => {
            reject(err)
        })
    })
}

export const deleteRegister = (date) => {
    return new Promise((resolve, reject) => {
        firebase.collection('registers').doc(date).delete().then(() => {
            resolve()
        }).catch((err) => {
            reject(err)
        })
    })
}

export const getRegistersBetweenDates = (startDate, endDate) => {    
    return new Promise((resolve, reject) => {        
        firebase.collection('registers')
            .where("dateRegister", ">=", startDate)
            .where("dateRegister", "<=", endDate)
            .get().then((result) => {                
                resolve(result)                
            }).catch((err) => {
                reject(err)
            })
    })
}