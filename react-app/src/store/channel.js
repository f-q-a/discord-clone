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
  payload: channel,
});

const deleteChannelAction = (channelId) => ({
  type: DELETE_CHANNEL,
  channelId
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
  const response = await fetch(`/api/channels/:${serverId}`);
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
    body: JSON.stringify({id: data.id, name: data.name})
})

if (response.ok) {
    data = await response.json()
    console.log("IS EDIT CHANNEL RESPONSE OK?", data.server_id)
    dispatch(editChannelAction(data.id, data.name))
    dispatch(getServerChannels(data.server_id, [data]))
}
}

export const deleteChannel = (channelId) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channelId}`, {
    method: "DELETE"
  });
  // const data = await response.json();
  // if (data.errors) return;
  if (response.ok){
    dispatch(deleteChannelAction(channelId));

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
  switch (action.type) {
    case GET_ALL_CHANNELS:
      return { channels: NormalizeData(action.payload) };
    case GET_SERVER_CHANNELS:
      newState = { ...state }
      newState.channels[action.serverId] = NormalizeData(action.channels);
      return newState;
    case DELETE_CHANNEL:
      let newStateChannels;
      newState = { ...state }
      newStateChannels = { ...state.channels }
      delete newStateChannels[action.channelId]
      return { ...state, channels: newStateChannels }
    case EDIT_CHANNEL:
     newState = {...state}
     newState.channels[action.id] = action.name
     return newState
    default:
      return state;
  }
}
