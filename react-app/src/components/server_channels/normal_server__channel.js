import React from "react";
import { NavLink } from "react-router-dom";

function NormalChannel({ channel }) {
  return (
    <div className="normal_channel__div">
      <h1>Channel</h1>
      <NavLink
        className="channel_list__link"
        exact
        to={`/@me/${channel.server_id}/${channel.id}`}
      />
    </div>
  );
}

export default NormalChannel;
