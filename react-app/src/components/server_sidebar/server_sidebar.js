// import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ServerSidebarItem from "./sidebar_item";
import React from "react";
// import { Redirect } from "react-router-dom";


const ServerSidebar = () => {

  const servers = useSelector((state)=> state.servers)

  const serversList = servers ? servers.values() : []
  return (
    <div className='sidebar__div'>
      <h1>SIDEBAR CONTAINER</h1>
      {serversList.map((server, index) => <ServerSidebarItem server={server} key={index} />)}
    </div>
  )
}

export default ServerSidebar;
