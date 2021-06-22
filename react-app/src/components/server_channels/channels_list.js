import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NormalChannel from "./normal_server__channel";
import * as channelActions from "../../store/channel";
import { useParams } from "react-router-dom";

function ChannelsList() {
  const { serverId } = useParams();
  const dispatch = useDispatch();
  console.log(serverId);

  useEffect(() => {
    dispatch(channelActions.getChannels(serverId));
  }, []);

  // const channels = useSelector((state) => state.channel.channels);
  // const channelsList = channels ? Object.values(channels) : [];
  return (
    <div className="channels__list">
      <h1>Channel List</h1>
      {/* {channelsList.map((channel, index) => (
        <NormalChannel channel={channel} key={index} />
      ))} */}
    </div>
  );
}

export default ChannelsList;
