import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { io } from 'socket.io-client'
import * as messageActions from "../../store/message"

// import { Redirect } from "react-router-dom";
let socket

const MessageMain = () => {
  const dispatch = useDispatch();

  let { channelId } = useParams();

  const user = useSelector(state => state.session.user)

  const [chatInput, setChatInput] = useState("")
  const [channelMessages, setChannelMessages] = useState([])

  useEffect(()=>{
    dispatch(messageActions.getMessages(channelId)).then(data => setChannelMessages(data));

    socket = io()

    socket.on('chat', (chat) => {
      setChannelMessages(channelMessages => [...channelMessages, chat])
      console.log()
      messageActions.createMessage(chat)
      })

      return (() => {
        socket.disconnect()
      })
  },[dispatch])

  const updateChatInput = (e) => {
    e.preventDefault()
    setChatInput(e.target.value)
  }

  const sendChat = (e) => {
    e.preventDefault()
    socket.emit('chat', { user: user, content: chatInput })
    dispatch(messageActions.createMessage(chatInput, channelId))
    setChatInput("")
  }
  channelMessages.forEach(e=>console.log(e))
  return (

  <div>
    <h1>MESSAGES CONTAINER</h1>
    {channelMessages && channelMessages.map((message, index) => <div> message={message.content} username={message.username} key={index}</div>)}
    <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type="submit">Send</button>
            </form>
  </div>
  )
}

export default MessageMain;
