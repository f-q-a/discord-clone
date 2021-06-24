const GET_SERVERUSERS = 'server/GET_SERVERUSERS';
const ADD_SERVERUSERS = 'server/ADD_SERVERUSERS';


const getServerUsersAction = (serverUsers) => ({
  type: GET_SERVERUSERS,
  payload: serverUsers
})

// const getServerUsersAction = (serverUser) => ({
//   type: GET_SERVERUSERS,
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

export const addServerUsers = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/serversuser/${serverId}`)
  if (response.ok) {
    const serverUser = await response.json();

    dispatch(addServerUsersAction(serverUser))
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
      newState = { relationships: { ...state.relationships } }
      newState.relationships[action.relationship.id] = action.relationship
      return newState;
    default:
      return state;
    }
}
