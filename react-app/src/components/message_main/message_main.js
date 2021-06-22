import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import * as messageActions from "../../store/message"

// import { Redirect } from "react-router-dom";


const MessageMain = () => {
  let { channelId } = useParams();
  const messages = useSelector((state)=> state.messages)
  const [channelMessages, setChannelMessages] = useState([])
  const dispatch = useDispatch()
  const allMessages = messages ? Object.values(messages) : []
  if (allMessages) console.log('<<<<', allMessages)
  useEffect(()=>{
    dispatch(messageActions.getMessages(channelId)).then(data => {
      console.log('````',data)
      setChannelMessages(data)
    })

  }, [dispatch])
  // const serversList = []
  return (
    <div>
      <h1>MESSAGES CONTAINER</h1>
      {channelMessages.map((message, index) => <div> message={message.content} key={index}</div>)}
    </div>
  )
}

export default MessageMain;
