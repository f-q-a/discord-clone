import ServerSidebar from "../server_sidebar/server_sidebar";
// import ChannelsList from "../server_channels/channels_list";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as serverActions from "../../store/server";
// import GeneralBar from "../top_bar/general_bar";
// import { Route } from "react-router-dom";

function MainApp() {
  const dispatch = useDispatch();
  const [serversLoaded, setServersLoaded] = useState(false)
  useEffect(() => {
    dispatch(serverActions.getServers()).then(() => setServersLoaded(true))

  }, [dispatch]);

  if (!serversLoaded) return null

  return (
    <>
      <ServerSidebar />
    </>
  );
}

export default MainApp;
