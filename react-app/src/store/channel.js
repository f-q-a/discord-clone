const GET_ALL_CHANNELS = "channel/GET_ALL_CHANNELS";
const GET_SERVER_CHANNELS = "channel/GET_SERVER_CHANNELS";
const CREATE_CHANNEL = "channel/CREATE_CHANNEL";
const DELETE_CHANNEL = "channel/DELETE_CHANNEL";
// const ADD_CHANNEL = "channel/ADD_CHANNEL";
const EDIT_CHANNEL = "channel/EDIT_CHANNEL";
const CLEAR_CHANNELS = "'channel/CLEAR-CHANNELS'"

export const getChannelsAction = (channels) => ({
  type: GET_ALL_CHANNELS,
  payload: channels,
});

export const getServerChannels = (serverId, channels) => ({
  type: GET_SERVER_CHANNELS,
  serverId,
  channels,
})
const createChannelAction = (channel) => ({
  type: CREATE_CHANNEL,
  channel,
});

const deleteChannelAction = (channelId, serverId) => ({
  type: DELETE_CHANNEL,
  channelId,
});

// const addChannelAction = (channel) => ({
//   type: ADD_CHANNEL,
//   payload: channel,
// });

const editChannelAction = (channelId, name) => ({
  type: EDIT_CHANNEL,
  channelId,
  name,
});

export const clearChannelsActions = () => ({ type: CLEAR_CHANNELS })

export const getChannels = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/channels/${serverId}`);
  const data = await response.json();
  if (data.errors) return;
  dispatch(getChannelsAction(data.channels));
  return data.channels;
};

export const editChannel = (data) => async (dispatch) => {
  // console.log('what is ', data)
  const response = await fetch(`/api/channels/${data.id}/edit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: data.id, name: data.name, server_id: data.server_id })
  })

  if (response.ok) {
    data = await response.json()
    // console.log("IS EDIT CHANNEL RESPONSE OK?", data.server_id)
    return dispatch(editChannelAction(data.id, data.name))
  }
}

export const createChannel = (data) => async (dispatch) => {
  const response = await fetch(`/api/channels/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: data.name, server_id: data.server_id })
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(createChannelAction(data));
    return data;
  }
  return data;
}


export const deleteChannel = (channelId, serverId) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channelId}`, {
    method: "DELETE"
  });
  // const data = await response.json();
  // if (data.errors) return;
  // console.log('THUNK')
  if (response.ok) {
    // console.log('IFTHUNK')
    dispatch(deleteChannelAction(channelId))

  }

  // return data.channels;
};

const NormalizeData = (data) => {
  const normData = {};
  data.forEach((e) => {
    normData[e.id] = e;
  });
  return normData;
};

const initialState = { channels: {} };

export default function reducer(state = initialState, action) {
  let newState;
  // let newStateChannels;
  switch (action.type) {
    case GET_ALL_CHANNELS:
      return { ...NormalizeData(action.payload) };
    case GET_SERVER_CHANNELS:
      newState = { ...state }
      newState[action.serverId] = NormalizeData(action.channels);
      return newState;
    case CREATE_CHANNEL:
      newState = { ...state }
      newState[action.channel.id] = action.channel
      return newState
    case CLEAR_CHANNELS:
      return { channels: {} }
    case DELETE_CHANNEL:
      newState = { ...state }
      delete newState[action.channelId]
      return newState
    case EDIT_CHANNEL:
      newState = { ...state }
      newState[action.id] = action.name
      return newState
    default:
      return state;
  }
}
