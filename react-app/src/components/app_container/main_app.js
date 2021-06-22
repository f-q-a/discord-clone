import ServerSidebar from "../server_sidebar/server_sidebar";
// import ChannelsList from "../server_channels/channels_list";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as serverActions from '../../store/server'
// import { useParams } from "react-router-dom";
import MembersList from "../../components/active_users_sidebar/active_users_sidebar"

function MainApp() {
  // const {serverId} = useParams();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(serverActions.getServers()).then(data => console.log(data))
  }, [dispatch])
  return (
    <div>
      <div className="app__container">
        <h1>APP CONTAINER</h1>
        <ServerSidebar />
      </div>
      <div className="app__container">
        <h1>MEMBER CONTAINER</h1>
        <MembersList />
      </div>
    </div>

  );
}

export default MainApp
