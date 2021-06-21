import firebase from '../services/dbConnect'


export const USER_ACCESS = "USER_ACCESS";

export const getUser = (email) => async (dispatch, getState) => {
    try {
        const userData = await firebase.collection('users').doc(email).get();        
        return dispatch({
            type: USER_ACCESS,
            payload: userData.data()
        })
    } catch (error) {
        console.log(error)
    }
}