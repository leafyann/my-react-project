import actionTypes from '../actions/actionTypes'

const initState = {
    isLoading: false,
    list: [
    //     {
    //     id: 1,
    //     title: 'Title here 111',
    //     desc: 'Description here 1',
    //     hasRead: false
    // },{
    //     id: 2,
    //     title: 'Title here 222',
    //     desc: 'Description here 2',
    //     hasRead: false
    // }
    ]
}

export default ( state = initState, action ) => {
    switch(action.type) {
        case actionTypes.RECEIVED_NOTIFICATION:
            return{
                ...state,
                list: action.payload.list
            }
        case actionTypes.START_NOTIFICATION_FETCH_POST:
            return{
                ...state,
                isLoading: true
            }
        case actionTypes.FINISH_NOTIFICATION_FETCH_POST:
            return{
                ...state,
                isLoading: false
            }    
        case actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID:
            const newList = state.list.map(item => {
                if (item.id === action.payload.id) {
                    item.hasRead = true
                }
                return item
            })
            return {
                ...state, 
                list: newList
            }
        case actionTypes.MARK_ALL_NOTIFICATION_AS_READ:
            return {
                ...state, 
                list: state.list.map(item => {           
                    item.hasRead = true                
                    return item
                })
            }
        default:
            return state
    }
}