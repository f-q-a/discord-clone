import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NormalChannel from "./normal_server__channel";
import * as messageActions from "../../store/message";
import { useParams } from "react-router-dom";

function ChannelsList() {
  const { serverId } = useParams();
  const dispatch = useDispatch();
  let channelsList = useSelector((state) => state.channel.channels[serverId]);
  // const servers = useSelector((state)=> state.server.servers)
  let channelIds = [];
  if (channelsList) {
    channelsList = Object.values(channelsList);
    // channelIds = channelsList.map(e => e.id
  }
  // const [messages, setMessages] = useState([])

  useEffect(() => {
    for (let i = 0; i < channelIds.length; i++) {
      console.log(channelIds[i].id);
      dispatch(messageActions.getMessages(channelIds[i].id));
    }
  }, [serverId]);
  console.log("making it HERRRERERRE");
  return (
    <div className="channels__list">
      <h1>Channel List</h1>
      {channelsList &&
        channelsList.map((channel, index) => (
          <NormalChannel channel={channel} key={index} />
        ))}
    </div>
  );
}

export default ChannelsList;
