// import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ServerSidebarItem from "./sidebar_item";
import React, {useState} from "react";
import ContextMenu from "./server_context_menu";
// import { Redirect } from "react-router-dom";

const ServerSidebar = () => {
  const servers = useSelector((state) => state.server.servers);

  const serversList = servers ? Object.values(servers) : [];
  // if (serversList) console.log("<<<<", serversList);
  // const serversList = []
  return (
    <div className="sidebar__div">
      <p>SIDEBAR CONTAINER</p>
      {serversList.map((server, index) => (
        <ServerSidebarItem server={server} key={index} />
      ))}

    </div>
  );
};

export default ServerSidebar;
