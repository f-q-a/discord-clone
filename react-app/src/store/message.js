// import { createChannelAction } from './channels'

const GET_ALL_MESSAGES = "message/GET_ALL_MESSAGES"
const CREATE_MESSAGE = "message/CREATE_MESSAGE"
const DELETE_MESSAGE = "message/DELETE_MESSAGE"
const ADD_MESSAGE = "message/ADD_MESSAGE"
const EDIT_MESSAGE = "message/EDIT_MESSAGE"
const UPDATE_CHANNEL_MESSAGES = "messages/CHAT_RECIEVED"
const CLEAR_MESSAGES = "message/CLEAR_MESSAGES"

const getMessagesAction = (channelId, messages) => ({
    type: GET_ALL_MESSAGES,
    channelId,
    messages

})

export const updateChannelMessagesAction = (channelId, message) => ({
    type : UPDATE_CHANNEL_MESSAGES,
    channelId,
    message
})

const createMessageAction = (message) => ({
    type: CREATE_MESSAGE,
    message
})

export const deleteMessageAction = (id) => ({
    type: DELETE_MESSAGE,
    id
})

export const addMessageAction = (message) => ({
    type: ADD_MESSAGE,
    message
})

export const editMessageAction = (message) => ({
    type: EDIT_MESSAGE,
    message
})

export const clearMessagesAction = () => ({type:CLEAR_MESSAGES})

export const getMessages = (channelId) => async (dispatch) => {
    const response = await fetch(`/api/messages/${channelId}`)
    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(getMessagesAction(channelId, data.messages))
    return data.messages;
}

export const createMessage = (channelId, content) => async (dispatch) => {
    const response = await fetch('/api/messages/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({channelId, content})
    })


    const data = await response.json();
    // console.log('hello from create message', data)
    if (data.errors) {
        return data;
    }
    dispatch(createMessageAction(data))
    // dispatch(createChannelAction(data.channel)
}


export const deleteMessage = (message) => async (dispatch) => {
    // console.log('WHEN I ARRIVE', message)
    const response = await fetch(`/api/messages/${message.id}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    // console.log('BEFORE I LEAVE', data)
    dispatch(deleteMessageAction(message.id))
    return data

}

export const editMessage = (message) => async(dispatch) =>{
    // console.log('ARE WE EVER REACHING THIS PART?', message)
    const response = await fetch(`/api/messages/${message.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(message)
    })
    const data = await response.json();
    if (data.errors){
        return data.errors;
    }
    dispatch(editMessageAction(data))
    return {};
}

// const NormalizeMessage = (messages) => {
//     const normMessage = {}
//     messages.forEach(message => {
//         normMessage[message.id] = message
//     })
//     return normMessage
// }

const initialState = { messages: {} }

export default function reducer(state = initialState, action) {
    let newState
    let newArr
    // let elementsIndex
    switch (action.type) {
        case GET_ALL_MESSAGES:
            newState = {}
            
            action.messages.forEach(message => newState[message.id] = message)
            return newState
        case CREATE_MESSAGE:
            newState = { ...state }
            newArr = [].concat(newState.messages[action.message.channel_id])
            newArr.push(action.message);
            newState.messages[action.message.channel_id] = newArr
            // thunk action not working, may be unnecessary
            // console.log('WHATS HANNENIN', newState)
            return {...state, messages: newState.messages}
        case DELETE_MESSAGE:
            newState = {...state}
            delete newState[action.id]
            return newState;
        case ADD_MESSAGE:
            newState = { ...state }
            newState[action.channelId] = {...state[action.channelId], [action.message.id]:action.message}
            return newState;
        case EDIT_MESSAGE:
            newState = {...state}
            newState[action.message.id] = action.message
            return newState;
        case UPDATE_CHANNEL_MESSAGES:
            newState = { ...state }
            newState[action.message.id] = action.message;
            return newState;
        case CLEAR_MESSAGES:
            return {}
        default:
            return state;
    }
}
