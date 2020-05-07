import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authStart = () => {
    return  {
        type: actionTypes.AUTH_START
    };
};
export const authSuccess = (idToken, userId) => {
    return  {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        userId
    };
};
export const authFail = (error) => {
    return  {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return  {
        type: actionTypes.AUTH_LOGOUT        
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCao-5jKCbiWNrJBWeEbrkzuWF8ukuFJiY';
        if(isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCao-5jKCbiWNrJBWeEbrkzuWF8ukuFJiY';
        }
        console.log('[URL]', url);
        axios.post(url, authData)
            .then(response => {
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err));
            });
        
    };
};