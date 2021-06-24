import React, { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Container from "./server_context_container";
import ServerForm from './server_edit_form'

const ServerSidebarItem = ({server}) => {
  {console.log("IS THIS INDIVD SERVER__________",server.id)}
  return (
    <div className='sidebar_item__div'>
      <p>SERVER SIDEBAR ITEM</p>
      <Container  serverId={server.id}>
      <NavLink className='server_sidebar__link' exact to={`/@me/${server.id}`}>Name: {server.name}</NavLink>
      </Container>
    </div>

  )
}

export default ServerSidebarItem;
