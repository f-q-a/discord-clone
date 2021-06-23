import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NormalChannel from "./normal_server__channel";
import * as messageActions from "../../store/message";
import { useParams, useHistory } from "react-router-dom";
import * as channelActions from '../../store/channel';

function ChannelsList() {
  const { serverId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const server = useSelector(state => state.server.servers[serverId])
  let user = useSelector(state => state.session.user)
  let channelsList = useSelector((state) => state.channel.channels[serverId]);
  // const servers = useSelector((state)=> state.server.servers)
  let channelIds = [];
  if (channelsList) {
    console.log('LOOK OVER HERE PAL ------> ', channelsList)
    channelsList = Object.values(channelsList);
    console.log('LOOK OVER HERE AGAIN PAL ------> ', channelsList)
    // channelIds = channelsList.map(e => e.id
  }
  // const [messages, setMessages] = useState([])
  const editChannel = (e, channelId) => {
    e.preventDefault()
    dispatch(channelActions.editChannel(channelId))
  }

  const deleteChannel = (e, channelId) => {
    e.preventDefault()
    dispatch(channelActions.deleteChannel(channelId))
    history.push('/')
  }

  useEffect(() => {
    for (let i = 0; i < channelIds.length; i++) {
      console.log(channelIds[i].id);
      dispatch(messageActions.getMessages(channelIds[i].id));
    }
  }, []);

  return (
    <div className="channels__list">
      <p>Channel List</p>
      {(user && user.id === server.user_id) ? (channelsList &&
        channelsList.map((channel, index) => (
          <div>
            <NormalChannel channel={channel} key={index} />
            <button onClick={(e) => editChannel(e, channel.id)}>Edit Channel</button>
            <button onClick={(e) => deleteChannel(e, channel.id)}>Delete Channel</button>
          </div>
        ))) : (channelsList &&
          channelsList.map((channel, index) => (
            <NormalChannel channel={channel} key={index} />
          )))}

    </div>
  )
}
export default ChannelsList;
