const GET_ALL_CHANNELS = "channel/GET_ALL_CHANNELS";
const CREATE_CHANNEL = "channel/CREATE_CHANNEL";
const DELETE_CHANNEL = "channel/DELETE_CHANNEL";
const ADD_CHANNEL = "channel/ADD_CHANNEL";
const EDIT_CHANNEL = "channel/EDIT_CHANNEL";

const getChannelsAction = (channels) => ({
  type: GET_ALL_CHANNELS,
  payload: channels,
});

const createChannelAction = (channel) => ({
  type: CREATE_CHANNEL,
  payload: channel,
});

const deleteChannelAction = (channel) => ({
  type: DELETE_CHANNEL,
  payload: channel,
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
  }
}
