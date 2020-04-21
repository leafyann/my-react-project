import actionTypes from './actionTypes'
import { loginRequest } from '../requests'

const startLogin = () => {
    return {
        type: actionTypes.START_LOGIN
    }
}

const loginSuccess = (userInfo) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: { 
            userInfo 
        }
    }
}

const loginFailed = () => {
    window.localStorage.removeItem('authToken')
    window.sessionStorage.removeItem('authToken')
    window.localStorage.removeItem('userInfo')
    window.sessionStorage.removeItem('userInfo')
    return {
        type: actionTypes.LOGIN_FAILED
    }
}

export const logout = () => {
    return dispatch => {
        // should send to the backend that user is logout here
        dispatch(loginFailed())
    }
}

export const login = (userInfo) => {
    return dispatch => {
        dispatch(startLogin())
        loginRequest(userInfo)
        .then(resp => {
            if (resp.data.code === 200) {
                console.log(resp)
                const {
                    authToken,
                    remember,
                    ...receivedUserInfo
                } = resp.data.data
                if(userInfo.remember === true) {
                    window.localStorage.setItem('authToken', authToken)
                    window.localStorage.setItem('userInfo', JSON.stringify(receivedUserInfo))
                } else {
                    window.sessionStorage.setItem('authToken', authToken)
                    window.sessionStorage.setItem('userInfo', JSON.stringify(receivedUserInfo))
                }
                dispatch(loginSuccess(resp.data.data))
            } else {
                dispatch(loginFailed())
            }
        })
    }
}