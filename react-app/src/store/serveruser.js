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
    console.log("Frontend______",serverUsers)
    console.log("Frontend______22",serverUsers.users)
    const membersArr = []
    for (let userObj of serverUsers.users) {
        membersArr.push(userObj)
        console.log("Backend",userObj)
    }
    console.log("Need Users_____",membersArr)
    dispatch(getServerUsersAction(membersArr))
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
