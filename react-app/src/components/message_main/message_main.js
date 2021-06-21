import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ServerSidebarItem from "./sidebar_item";
import React from "react";

// import { Redirect } from "react-router-dom";


const MessageMain = () => {
  let { channelId } = useParams();
  const allMessages = useSelector((state)=> state.messages)
  print(allMessages)
  const serversList = servers ? Object.values(servers) : []
  if (serversList) console.log('<<<<', serversList)
  // const serversList = []
  return (
    <div className='sidebar__div'>
      <h1>SIDEBAR CONTAINER</h1>
      {serversList.map((server, index) => <ServerSidebarItem server={server} key={index} />)}
    </div>
  )
}

export default MessageMain;
