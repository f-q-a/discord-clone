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
    payload: message
})

export const deleteMessageAction = (message) => ({
    type: DELETE_MESSAGE,
    payload: message
})

export const addMessageAction = (message) => ({
    type: ADD_MESSAGE,
    message
})

export const editMessageAction = (messageId, content) => ({
    type: EDIT_MESSAGE,
    messageId,
    content
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
        return;
    }
    dispatch(createMessageAction(data.message))
    // dispatch(createChannelAction(data.channel))
    return data.message.id;
}


export const deleteMessage = (messageId) => async (dispatch) => {
    const response = await fetch(`api/messages/${messageId}`, {
        method: 'DELETE',
    });

    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(deleteMessageAction(messageId))
}

export const editMessage = (messageId) => async(dispatch) =>{
    const response = await fetch(`api/messages/${messageId}`, {
        method: 'PUT'
    })
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
            newState.messages[action.payload.id] = action.payload
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
            newState.messages[action.messageId].content = action.content;
            return newState;
        default:
            return state;
    }
}
