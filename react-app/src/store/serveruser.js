const GET_ALL_SERVERUSERS = "message/GET_ALL_SERVERUSERS"
const REMOVE_SERVERUSERS = "message/REMOVE_SERVERUSERS"
const ADD_SERVERUSERS = "message/ADD_SERVERUSERS"

const getServerUsers = (serveruser) => ({
    type: GET_ALL_SERVERUSERS,
    payload: serveruser
})

// export const removeServerUsers= (memberId) => ({
//     type: REMOVE_SERVERUSERS,
//     memberId
// })

// export const removeServerUsers = () => ({
//     type: REMOVE_SERVERUSERS
// })

// export const addServerUsers = (userId, username) => ({
//     type: ADD_SERVERUSERS,
//     userId,
//     username
// })

export const getUsersForSidebar = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/serversuser`)
    const serveruser = await response.json();
    console.log("frontend______",serveruser)
    const serveruserArr = []
    if (response.ok) {
        dispatch(getServerUsers(serveruserArr))
    }
}



const initialState = { serveruser: {} }

export default function reducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case GET_ALL_SERVERUSERS:
            newState = { serveruser: { ...state.serveruser } }
            action.payload.forEach(serveruser => {
                newState.serveruser[serveruser.id] = serveruser
            })
            return newState
        case REMOVE_SERVERUSERS:
            newState = { serveruser: {} }
            return newState
        case REMOVE_SERVERUSERS:
            newState = { serveruser: { ...state.serveruser } }
            delete newState.serveruser[action.memberId]
            return newState
        case ADD_SERVERUSERS:
            newState = { serveruser: { ...state.serveruser } }
            newState.serveruser[action.user_id] = {
                user_id: action.user_id,
                server_id: action.server_id
            }
            return newState
        default:
            return state;
    }
}
