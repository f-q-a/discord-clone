// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import React from "react";


const ServerSidebarItem = (server) => {

  return (
    <div className='sidebar_item__div'>
      <h1>SIDEBAR ITEM</h1>
      <NavLink className='server_sidebar__link' exact to={`/@me/${server.id}`}>{server.name}</NavLink>
    </div>
  )
}

export default ServerSidebarItem;
