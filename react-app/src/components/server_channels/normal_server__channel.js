import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {NavLink, useParams} from 'react-router-dom';
import * as messageActions from '../../store/message';

function NormalChannel({channel}) {
  const {serverId, channelId} = useParams();
  const dispatch = useDispatch();
  const [activeDiv, setActiveDiv] = useState('');
  useEffect(() => {
    dispatch(messageActions.getMessages(channel.id));
  }, [serverId]);
  return (
    <>
      <NavLink
        className="channel_list__link"
        exact
        to={`/@me/${channel.server_id}/${channel.id}`}
        activeClassName='active_channel'
      >
        <div className={`normal_channel__div ${activeDiv}`}>
          <p># {channel.name} </p>
        </div>
      </NavLink>
    </>
  );
}

export default NormalChannel;
