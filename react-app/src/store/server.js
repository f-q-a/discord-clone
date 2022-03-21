// import { createChannelAction } from './channel'
import * as ChannelActions from './channel'

const GET_ALL_SERVERS = "server/GET_ALL_SERVERS"
const CREATE_SERVER = "server/CREATE_SERVER"
const DELETE_SERVER = "server/DELETE_SERVER"
const ADD_SERVER = "server/ADD_SERVER"
const EDIT_SERVER = "server/EDIT_SERVER"

const getServersAction = (servers) => ({
    type: GET_ALL_SERVERS,
    payload: servers
})

const createServerAction = (server) => ({
    type: CREATE_SERVER,
    payload: server
})

export const deleteServerAction = (server) => ({
    type: DELETE_SERVER,
    payload: server
})

export const addServerAction = (server) => ({
    type: ADD_SERVER,
    server
})

export const editServerAction =  (name, serverId) => ({
    type: EDIT_SERVER,
    name,
    serverId
})




export const getServers = () => async (dispatch) => {
    const response = await fetch('/api/servers/')
    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(getServersAction(data.servers))
    return data.servers;
}

export const createServer = (name, image) => async (dispatch) => {
    const response = await fetch('/api/servers/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, image })
    })
    const data = await response.json();
    if (response.ok){
         dispatch(createServerAction(data.server))
         dispatch(ChannelActions.getChannels(data.server.id))
        // not sure if i can double disptach
    } else {
        return {}
    }
}

export const editServer = (serverId , name) => async (dispatch) => {
    // should be accepting form data with name and server data
    const response = await fetch(`/api/servers/${serverId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    })
    if (response.ok){
        dispatch(editServerAction(name, serverId))
        return {}
    }else{
        return {}
    }



    // return data // dont need
}


export const deleteServer = (serverId) => async (dispatch) => {
    const response = await fetch(`api/servers/${serverId}`, {
        method: 'DELETE'
    });
    // const data = await response.json();
    // console.log(data)
    if (response.ok){
        dispatch(deleteServerAction(serverId))

    }
    // else {
    //     return data.errors
    // }
}

const NormalizeServer = (servers) => {
    const normServer = {}
    servers.forEach(server => {
        normServer[server.id] = server
    })
    return normServer
}

const initialState = { servers: {} }
// { servers: { ...state.servers } }
export default function reducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case GET_ALL_SERVERS:
            return NormalizeServer(action.payload)
        case CREATE_SERVER:
            newState = { servers: { ...state.servers } }
            newState.servers[action.payload.id] = action.payload
            return newState
        case DELETE_SERVER:
            newState= {...state.servers}
            delete newState[action.payload]
            // console.log("STATE__________",{...state,servers:newState})
            // console.log("STATE__________2",{newState})
            return {...state,servers:newState}
        case ADD_SERVER:
            newState = { servers: { ...state.servers } }
            newState.servers[action.server.id] = action.server
            return newState;
        case EDIT_SERVER:
            newState = { servers: { ...state.servers } }
            newState.servers[action.serverId].name = action.name;
            return newState;
        default:
            return state;
    }
}
