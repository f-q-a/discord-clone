import React, { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Container from "./server_context_container";

const menuItems = [
  { text: "Add Friend", onClick: () => {console.log("Added Friend")}},
  { text: "Edit Server Name", onClick: () => {console.log("Edited Server Name")}},
  { text: "Delete Server", onClick: () => {console.log("Deleted Server")}}
]

const ServerSidebarItem = ({server}) => {
  return (
    <div className='sidebar_item__div'>
      <p>SERVER SIDEBAR ITEM</p>
      <Container menuItems={menuItems}>
      <NavLink className='server_sidebar__link' exact to={`/@me/${server.id}`}>Name: {server.name}</NavLink>
      </Container>
    </div>
  )
}

export default ServerSidebarItem;
