import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authStart = () => {
    return  {
        type: actionTypes.AUTH_START
    };
};
export const authSuccess = (authData) => {
    return  {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};
export const authFail = (error) => {
    return  {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};


export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        console.log('[json]', authData);
        axios.get('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCao-5jKCbiWNrJBWeEbrkzuWF8ukuFJiY', authData)
            .then(response => {
                console.log('[auth]', response);
                dispatch(authSuccess(response.data));
            })
            .catch(error => {
                console.log('[auth]', error)
                dispatch(authFail(error));
            });
        
    };
};