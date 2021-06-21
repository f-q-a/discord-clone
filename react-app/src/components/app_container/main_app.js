import ServerSidebar from "../server_sidebar/server_sidebar";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as serverActions from '../../store/server'

function MainApp() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(serverActions.getServers())
  }, [])
  return (
    <div className="app__container">
      <h1>APP CONTAINER</h1>
      <ServerSidebar />
    </div>
  );
}

export default MainApp
