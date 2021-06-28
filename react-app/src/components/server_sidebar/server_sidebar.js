// import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ServerSidebarItem from "./sidebar_item";
import React, { useState, useEffect } from "react";
import ContextMenu from "./server_context_menu";
import ServerFormAddModal from "./server_modal_add"
import {getServers} from "../../store/server"
// import {authenticate} from "../../store/session"
const separator = <div className="separator__div"></div>

const ServerSidebar = () => {
  const servers = useSelector((state) => state.server.servers);
  // const user = useSelector(state => state.session.user)

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getServers());
  //   // dispatch(authenticate())
  // }, [dispatch]);


  console.log("Where",servers)
  const serversList = servers ? Object.values(servers) : [];

  const Private = serversList.filter((el) => el.type === "private")
  const Public= serversList.filter((el) => (el.type === "public")  )
  // && el.user_id ===user.id
  return (
    <div className="sidebar__div">
      <p>SIDEBAR CONTAINER</p>
      {separator}
      {serversList.map((server, index) => (
        <ServerSidebarItem server={server} key={index} />
      ))}
      {separator}
        <ServerFormAddModal />
    </div>

  );
};

export default ServerSidebar;


// import ServerForm from './server_edit_form'
// import { Modal } from '../../context/Modal';
// <div>
// <ServerForm />
// </div>
