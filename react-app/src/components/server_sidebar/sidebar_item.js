import React, {useEffect, useState, useRef} from 'react';
// import { useDispatch, useSelector } from "react-redux";
import {NavLink} from 'react-router-dom';
import Container from './server_context_container';

const ServerSidebarItem = ({server}) => {
  return (
    <div className={`sidebar_item__div `}>
      <Container serverId={server.id} className="sidebar_container__div">
        <NavLink
          className="server_sidebar__link"
          exact
          to={`/@me/${server.id}`}
        >
          {server.name}
        </NavLink>
      </Container>
    </div>
  );
};

export default ServerSidebarItem;
