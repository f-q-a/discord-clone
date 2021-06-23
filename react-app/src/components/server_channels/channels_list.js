import React, { useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import NormalChannel from "./normal_server__channel";
import * as messageActions from "../../store/message";
import { useParams } from "react-router-dom";
import * as channelActions from '../../store/channel';

function ChannelsList() {
  const { serverId } = useParams();
  const dispatch = useDispatch();
  let user = useSelector(state => state.session.user)
  let channelsList = useSelector((state) => state.channel.channels[serverId]);
  let server = useSelector(state => state.server.servers[serverId])
  console.log(server)
  let channelIds = []
  if (channelsList) {
    channelsList = Object.values(channelsList)
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
  }

  useEffect(() => {
    for (let i = 0; i < channelIds.length; i++) {
      console.log(channelIds[i].id)
      dispatch(messageActions.getMessages(channelIds[i].id))
    }

  }, [serverId])
  console.log('making it HERRRERERRE')
  return (
    <div className="channels__list">
      <h1>Channel List</h1>
      {channelsList && channelsList.map((channel, index) => (
        (user && user.id === server.user_id) ?
      <div>
          <NormalChannel channel={channel} key={index} />
          <button onClick={(e) => editChannel(e, channel.id)}>Edit Channel</button>
          <button onClick={(e) => deleteChannel(e, channel.id)}>Delete Channel</button>
      </div> : <NormalChannel channel={channel} key={index}/>)
      )}
    </div>
  )
}
export default ChannelsList;
