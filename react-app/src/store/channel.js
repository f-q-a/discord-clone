const GET_ALL_CHANNELS = "channel/GET_ALL_CHANNELS";
const GET_SERVER_CHANNELS = "channel/GET_SERVER_CHANNELS";
const CREATE_CHANNEL = "channel/CREATE_CHANNEL";
const DELETE_CHANNEL = "channel/DELETE_CHANNEL";
const ADD_CHANNEL = "channel/ADD_CHANNEL";
const EDIT_CHANNEL = "channel/EDIT_CHANNEL";

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
  serverId,
});

const addChannelAction = (channel) => ({
  type: ADD_CHANNEL,
  payload: channel,
});

const editChannelAction = (channelId, name) => ({
  type: EDIT_CHANNEL,
  channelId,
  name,
});

export const getChannels = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/channels/${serverId}`);
  const data = await response.json();
  if (data.errors) return;
  dispatch(getChannelsAction(data.channels));
  return data.channels;
};

export const editChannel = (data) => async (dispatch) => {
  console.log('what is ', data)
  const response = await fetch(`/api/channels/${data.id}/edit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: data.id, name: data.name, server_id: data.server_id })
  })

  if (response.ok) {
    data = await response.json()
    console.log("IS EDIT CHANNEL RESPONSE OK?", data.server_id)
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
  console.log('THUNK')
  dispatch(deleteChannelAction(channelId, serverId))
  if (response.ok) {
    console.log('IFTHUNK')

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
  let newStateChannels;
  switch (action.type) {
    case GET_ALL_CHANNELS:
      return { channels: NormalizeData(action.payload) };
    case GET_SERVER_CHANNELS:
      newState = { ...state }
      newState.channels[action.serverId] = NormalizeData(action.channels);
      return newState;
    case CREATE_CHANNEL:
      newState = { ...state }
      newStateChannels = newState.channels[action.channel.server_id]
      console.log('This is newStateChannels ---> ', newStateChannels)
      newStateChannels[action.channel.id] = action.channel
      newState.channels[action.channel.server_id] = newStateChannels
      return newState

    case DELETE_CHANNEL:
      newState = { ...state }
      delete newState.channels[action.serverId][action.channelId]
      return newState
    case EDIT_CHANNEL:
      newState = { ...state }
      newState.channels[action.id] = action.name
      return newState
    default:
      return state;
  }
}
