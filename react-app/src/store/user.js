// import { createChannelAction } from './channels'
// import * as ChannelActions from './channel'
const GET_USERS = "user/GET_USER"

const getUserAction = (users) => ({
    type: GET_USERS,
    payload: users
})

export const getAllUsers = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/`)
    const data = await response.json();
    if (data.errors){
        return data
    } else {
        dispatch(getUserAction(data.users))
        return {}
    }
}

const NormalizeUser= (users) => {
    const normUser = {}
    users.forEach(user => {
        normUser[user.id] = user
    })
    return normUser
}

const initialState = { users: {} }

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return { users: NormalizeUser(action.payload) }
        default:
            return state;
    }
}
