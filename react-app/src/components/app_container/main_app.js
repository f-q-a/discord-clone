import ServerSidebar from "../server_sidebar/server_sidebar";
// import ChannelsList from "../server_channels/channels_list";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as serverActions from "../../store/server";

function MainApp() {

<<<<<<< HEAD
=======

>>>>>>> main
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(serverActions.getServers()).then((data) => console.log(data));



  }, [dispatch]);


  return (
<<<<<<< HEAD
    <>
      <div className="sidebar__container">
        <ServerSidebar />

      </div>
    </>
=======
    <div className="sidebar__container">
      <ServerSidebar />
        
    </div>
>>>>>>> main
  );
}

export default MainApp;
