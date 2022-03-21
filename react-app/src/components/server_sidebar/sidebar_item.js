import React from 'react';
// import { useDispatch, useSelector } from "react-redux";
import {NavLink} from 'react-router-dom';
import Container from './server_context_container';

const ServerSidebarItem = ({server}) => {

  function serverAbbr(name) {
    const words = name.split(' ');
    let abbr = '';
    words.forEach(e => {
      const firstLetter = e[0]
      if (!abbr.length) abbr+=firstLetter
      else if (firstLetter === firstLetter.toLowerCase()) return
      else abbr+=firstLetter
    })
    return abbr;
  } 
  return (
    <div className={`sidebar_item__div `}>
      <Container serverId={server.id} className="sidebar_container__div">
        <NavLink
          className={`server_sidebar__link server_num${server.id}`}
          to={`/channels/${server.id}`}
        >
          <div className='server_abbrev'>
            {serverAbbr(server.name)}
            </div>
          <div className='current_active_pip__div' />
        </NavLink>
      </Container>
      <div className='active_pip__div'/>
      <div className='hidden_servername'>
        <div className='servername_triangle' />
        {server.name}
      </div>
    </div>
  );
};

export default ServerSidebarItem;
