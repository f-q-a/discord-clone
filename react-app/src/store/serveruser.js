const GET_SERVERUSERS = 'server/GET_SERVERUSERS';
const ADD_SERVERUSERS = 'server/ADD_SERVERUSERS';


const getServerUsersAction = (serverUsers) => ({
  type: GET_SERVERUSERS,
  payload: serverUsers
})

// const addServerUsersAction = (serverUser) => ({
//   type: ADD_SERVERUSERS,
//   payload: serverUser
// })

//thunk
export const getServerUsers = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/serversuser/${serverId}`)
  if (response.ok) {
    const serverUsers = await response.json();
    const serverUsersArr = []
    for (let userObj of serverUsers.users) {
      serverUsersArr.push(userObj)
    }
    dispatch(getServerUsersAction(serverUsersArr))
  }

}

export const addServerUsers = (serverId, name) => async (dispatch) => {
  const response = await fetch(`/api/servers/serversuser/${serverId}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ serverId, name })
    })

    const data = await response.json();
    
    if (data.errors){
      return data
    } else {
      getServerUsers(serverId)
      return {}
    }
  }

const NormalizeServerUsers  = (serverUsers) => {
    const normServerUsers = {}
    serverUsers.forEach(server => {
        normServerUsers[server.id] = server
    })
    return normServerUsers
}

// reducer
 const initialState = { serveruser: {} };

export default function serveruser(state = initialState, action) {
  let newState
  switch (action.type) {
    case GET_SERVERUSERS:
      return NormalizeServerUsers(action.payload)
    case ADD_SERVERUSERS:
      // console.log(newState)
      newState = { serveruser: { ...state.payload } }
      newState.serveruser[action.payload.id] = action.serveruser
      return newState;
    default:
      return state;
    }
}
