import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NormalChannel from "./normal_server__channel";
import * as messageActions from "../../store/message";
import { useParams, useHistory } from "react-router-dom";
import * as channelActions from '../../store/channel';
import { Link } from "react-router-dom";

function ChannelsList() {
  const { serverId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const server = useSelector(state => state.server.servers[serverId])
  let user = useSelector(state => state.session.user)
  let channelsList = useSelector((state) => state.channel.channels[serverId]);

  console.log("WHAT IS CURRSERVER???", server)
  let channelIds = [];

  if (channelsList) {
    console.log('LOOK OVER HERE PAL ------> ', channelsList)
    channelsList = Object.values(channelsList);
    console.log('LOOK OVER HERE AGAIN PAL ------> ', channelsList)
    // channelIds = channelsList.map(e => e.id
  }
  // const [messages, setMessages] = useState([])

  const deleteChannel = (e, channelId) => {
    e.preventDefault()
    dispatch(channelActions.deleteChannel(channelId))
    history.push('/')
  }

  const el = document.querySelector("body")
  el.addEventListener('contextmenu', function(ev) {
    ev.preventDefault();
    return false;
 }, false);


  useEffect(() => {
    for (let i = 0; i < channelIds.length; i++) {
      console.log(channelIds[i].id);
      dispatch(messageActions.getMessages(channelIds[i].id));

    }

  }, [channelsList]);

  return (
    <div className="channels__list">
      <p>Channel List</p>
      {/* {(user && user.id === server.user_id) ? (channelsList && */}
      {channelsList &&
        channelsList.map((channel, index) => (
          <div>
            <NormalChannel channel={channel} key={index} id={`channel_${channel.id}`} />
            <Link key={index} to={`/@me/${server.id}/${channel.id}/edit`}>Edit Channel Name</Link>{' '}
            <button onClick={(e) => deleteChannel(e, channel.id)}>Delete Channel</button>
          </div>
        ))}
      <Link to={`/@me/${server.id}/add`}>Add New Channel</Link>{' '}
    </div>
  )
}
export default ChannelsList;
