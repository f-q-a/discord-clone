import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import * as messageActions from '../../store/message'

function NormalChannel({ channel }) {
  const  {serverId} = useParams();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(messageActions.getMessages(channel.id))
  },[serverId])
  return (
    <div className="normal_channel__div">
      <p>Channel</p>
      <NavLink
        className="channel_list__link"
        exact
        to={`/@me/${channel.server_id}/${channel.id}`}>
          {channel.name}
        </NavLink>
    </div>
  );
}

export default NormalChannel;
