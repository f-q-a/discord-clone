import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import React from "react";

// import { Redirect } from "react-router-dom";


const MessageMain = () => {
  let { channelId } = useParams();
  const messages = useSelector((state)=> state.messages)
  console.log(messages)
  const allMessages = messages ? Object.values(messages) : []
  if (allMessages) console.log('<<<<', allMessages)
  // const serversList = []
  return (
    <div>
      <h1>SIDEBAR CONTAINER</h1>
      {allMessages.map((message, index) => <div> message={message} key={index}</div>)}
    </div>
  )
}

export default MessageMain;
