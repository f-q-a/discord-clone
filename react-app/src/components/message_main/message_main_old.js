import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import * as messageActions from "../../store/message"

// import { Redirect } from "react-router-dom";
///OLDOLDOLDOLD

const MessageMain = () => {
  let { channelId } = useParams();
  const channelMessages = useSelector((state)=> state.message.messages[channelId])
  // console.log('chanchanchanchan', channelId)
  // console.log('honk', channelMessages)
  return (
    // <div>
    //   <h1>MESSAGES CONTAINER</h1>
    //   {channelMessages.map((message, index) => <div> message={message.content} key={index}</div>)}
    // </div>
  <div>
    <h1>MESSAGES CONTAINER</h1>
    {channelMessages && channelMessages.map((message, index) => <div> message={message.content} key={index}</div>)}
  </div>
  )
}
///OLDOLDOLDOLD
export default MessageMain;
