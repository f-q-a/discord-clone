// import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ServerSidebarItem from "./sidebar_item";
import PrivateServer from "./private_server";
import React, { useState, useEffect } from "react";
import ContextMenu from "./server_context_menu";
import ServerFormAddModal from "./server_modal_add"
import { getServers } from "../../store/server"
import { Route } from "react-router-dom";
import ChannelsList from "../server_channels/channels_list";
// import {authenticate} from "../../store/session"
const separator = <div className="separator__div"></div>

const ServerSidebar = () => {
  const servers = useSelector((state) => state.server);
  const user = useSelector(state => state.session.user)
  console.log("what is this", user)
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getServers());
  //   // dispatch(authenticate())
  // }, [dispatch]);


  console.log("Where", servers)
  const serversList = Object.values(servers)

  return (
    <>
      <div className="sidebar__container">
        <div className="sidebar__div">
          <p>SIDEBAR CONTAINER</p>
          {separator}
          {/* <PrivateServer /> */}
          {separator}
          {serversList.map((server, index) => (
            <ServerSidebarItem server={server} key={index} />
          ))}
          {separator}
          <ServerFormAddModal />
        </div>
      </div>
      <Route path='/channels/:serverId/'>
        <ChannelsList />
      </Route>
    </>
  );
};

export default ServerSidebar;


// import ServerForm from './server_edit_form'
// import { Modal } from '../../context/Modal';
// <div>
// <ServerForm />
// </div>
