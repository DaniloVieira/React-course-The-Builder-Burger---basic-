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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
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
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.date.userId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err));
            });
        
    };
};

export const setAuthRedirectPath = (path) => {
    return  {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('tokenId');
        if(!token){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate < new Date()){
                dispatch(logout());
            }else{
                dispatch(authSuccess(token));
            }
        }
    };
}