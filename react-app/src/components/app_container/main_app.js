import ServerSidebar from "../server_sidebar/server_sidebar";
// import ChannelsList from "../server_channels/channels_list";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as serverActions from "../../store/server";
// import { useParams } from "react-router-dom";

function MainApp() {
  // const {serverId} = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(serverActions.getServers()).then((data) => console.log(data));
  }, [dispatch]);
  return (
    <div className="sidebar__container">
      <ServerSidebar />

    </div>
  );
}

export default MainApp;
