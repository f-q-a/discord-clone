// // import { createChannelAction } from './channels'
// // import * as ChannelActions from './channel'
// const GET_USER = "user/GET_USER"
// const DELETE_USER = "user/DELETE_USER"



// export const getUser = (userId) => async (dispatch) => {
//     const response = await fetch(`/api/user/${userId}`)
//     const data = await response.json();
//     if (data.errors){
//         return data
//     } else {
//         dispatch(getUserAction(userId))
//         return {}
//     }
// }

// export const editUser = (userId,username,email,image,password,repeatPassword) => async (dispatch) => {

//     const response = await fetch(`/api/users/${userId}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username,email,image,password,repeatPassword })
//     })
//     const data = await response.json();
//     if (data.errors){
//         return data
//     } else {
//         getUser(userId)
//         return {}
//     }
// }


// export const deleteUser = (userId) => async (dispatch) => {
//     const response = await fetch(`api/users/${userId}`, {
//         method: 'DELETE'
//     });
//     if (response.ok){
//         getUser(userId)

//     }
// }

// const NormalizeUser= (users) => {
//     const normUser = {}
//     users.forEach(user => {
//         normUser[user.id] = user
//     })
//     return normUser
// }

// const initialState = { users: {} }

// export default function reducer(state = initialState, action) {
//     let newState
//     switch (action.type) {
//         case GET_USER:
//             return { users: NormalizeUser(action.payload) }
//         case DELETE_USER:
//             newState= {...state}
//             console.log("Delete_____",newState)
//             delete newState[action.payload]
//             return {...state,users:newState}
//         case EDIT_USER:
//             newState = { users: { ...state } }
//             console.log("Edit_____",newState)
//             newState.users[action.payload] = action;
//             return newState;
//         default:
//             return state;
//     }
// }
