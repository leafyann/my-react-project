import actionTypes from './actionTypes'
import { getNotificationList } from '../requests'

const startPost = () => {
    return{
        type: actionTypes.START_NOTIFICATION_FETCH_POST
    }
}

const finishPost = () => {
    return{
        type: actionTypes.FINISH_NOTIFICATION_FETCH_POST
    }
}

export const markNotificaitonAsReadById = (id) => {
    return dispatch => {
        dispatch(startPost())
        // This simulates a request from the server
        setTimeout(() => {
            dispatch({
                type: actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID,
                payload: {
                    id
                }
            })
            dispatch(finishPost())
        }, 500)
    }
}

export const markAllNotificaitonAsRead = () => {
    return dispatch => {
        dispatch(startPost())
        // This simulates a request from the server
        setTimeout(() => {
            dispatch({
                type: actionTypes.MARK_ALL_NOTIFICATION_AS_READ,
            })
            dispatch(finishPost())
        }, 500)
    }
}

export const getNotification = () => {
    return dispatch => {
        dispatch(startPost())
        getNotificationList()
            .then(resp => {
                dispatch({
                    type: actionTypes.RECEIVED_NOTIFICATION,
                    payload: {
                        list: resp.data.list
                    }
                })
                dispatch(finishPost())
            })
  
    }
}