import firebase from '../dbConnect';


export const getEmployee = (email) => {
    return new Promise((resolve, reject) => {
        firebase.collection('users').doc(email).get().then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const getAllEmployees = () => {
    return new Promise((resolve, reject) => {
        firebase.collection('users').get().then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const saveEmployee = (email, data) => {
    return new Promise((resolve, reject) => {
        firebase.collection('users').doc(email).set(data).then(() => {
            resolve()
        }).catch((err) => {
            reject(err)
        })
    })
}

export const updateEmployee = (email, data) => {
    return new Promise((resolve, reject) => {
        firebase.collection('users').doc(email).update(data).then(() => {
            resolve()
        }).catch((err) => {
            reject(err)
        })
    })
}

export const deleteEmployee = (email) => {
    return new Promise((resolve, reject) => {
        firebase.collection('users').doc(email).delete().then(() => {
            resolve()
        }).catch((err) => {
            reject(err)
        })
    })
}