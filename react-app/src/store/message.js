// import { createChannelAction } from './channels'

const GET_ALL_MESSAGES = "message/GET_ALL_MESSAGES"
const CREATE_MESSAGE = "message/CREATE_MESSAGE"
const DELETE_MESSAGE = "message/DELETE_MESSAGE"
const ADD_MESSAGE = "message/ADD_MESSAGE"
const EDIT_MESSAGE = "message/EDIT_MESSAGE"

const getMessagesAction = (channelId, messages) => ({
    type: GET_ALL_MESSAGES,
    messages,
    channelId
})

const createMessageAction = (message) => ({
    type: CREATE_MESSAGE,
    message
})

export const deleteMessageAction = (message) => ({
    type: DELETE_MESSAGE,
    payload: message
})

export const addMessageAction = (message) => ({
    type: ADD_MESSAGE,
    message
})

export const editMessageAction = (message) => ({
    type: EDIT_MESSAGE,
    message
})

export const getMessages = (channelId) => async (dispatch) => {
    const response = await fetch(`/api/messages/${channelId}`)
    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(getMessagesAction(channelId, data.messages))
    return data.messages;
}

export const createMessage = (content, channelId) => async (dispatch) => {
    const response = await fetch('/api/messages/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content, channelId })
    })


    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(createMessageAction(data))
    // dispatch(createChannelAction(data.channel)
}


export const deleteMessage = (messageId) => async (dispatch) => {
    const response = await fetch(`/api/messages/${messageId}`, {
        method: 'DELETE',
    });

    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(deleteMessageAction(messageId))
}

export const editMessage = (message) => async(dispatch) =>{
    const response = await fetch(`/api/messages/${message.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: message.id, user_id: message.user_id, content: message.content, channel_id: message.channel_id })
    })
    const data = await response.json();
    if (data.errors){
        return data.errors;
    }
    dispatch(editMessageAction(message))
    return {};
}

const NormalizeMessage = (messages) => {
    const normMessage = {}
    messages.forEach(message => {
        normMessage[message.id] = message
    })
    return normMessage
}

const initialState = { messages: {} }

export default function reducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case GET_ALL_MESSAGES:
            newState = {...state}
            newState.messages[action.channelId] = action.messages
            return newState;
        case CREATE_MESSAGE:
            newState = { messages: { ...state.messages } }
            newState.messages[action.message.id] = action.payload
            // thunk action not working, may be unnecessary
            return newState
        case DELETE_MESSAGE:
            newState = { messages: { ...state.messages } }
            delete newState.messages[action.payload]
            return newState
        case ADD_MESSAGE:
            newState = { messages: { ...state.messages } }
            newState.messages[action.message.id] = action.message
            return newState;
        case EDIT_MESSAGE:
            newState = { messages: { ...state.messages } }
            newState.messages[action.message.id].content = action.message.content;
            return newState;
        default:
            return state;
    }
}
