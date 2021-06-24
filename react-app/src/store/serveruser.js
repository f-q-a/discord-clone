const GET_SERVERUSERS = 'server/GET_SERVERUSERS';


const getServerUsersAction = (serverUsers) => ({
  type: GET_SERVERUSERS,
  payload: serverUsers
})
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

  switch (action.type) {
    case GET_SERVERUSERS:
        return NormalizeServerUsers(action.payload)
    default:
      return state;
    }
}
