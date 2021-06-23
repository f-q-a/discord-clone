import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import * as messageActions from "../../store/message";

// import { Redirect } from "react-router-dom";
let socket;

const MessageMain = () => {
  const dispatch = useDispatch();

  let { serverId, channelId } = useParams();

  const user = useSelector((state) => state.session.user);

  const [chatInput, setChatInput] = useState("");
  const [channelMessages, setChannelMessages] = useState([]);

  useEffect(() => {
    dispatch(messageActions.getMessages(channelId)).then((data) =>
      setChannelMessages(data)
    );

    socket = io();
    socket.emit("join", { channelId: channelId, username: user.username });

    socket.on("chat", (chat) => {
      setChannelMessages((channelMessages) => [...channelMessages, chat]);
      console.log();
      messageActions.createMessage(chat);
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const updateChatInput = (e) => {
    e.preventDefault();
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", {
      user: user,
      content: chatInput,
      channelId: channelId,
    });
    dispatch(messageActions.createMessage(chatInput, channelId));
    setChatInput("");
  };
  channelMessages.forEach((e) => console.log(e));
  return (
    <>
        <div className="channel__context">MESSAGES CONTAINER</div>
        <div className='messages_body__div'>
          {channelMessages &&
            channelMessages.map((message, index) => (
              <div className="message__div">
                {" "}
                message={message.content} username={message.username} key=
                {index}
              </div>
            )).reverse()}
      </div>
      <form onSubmit={sendChat} className="chat_box">
        <input className='text__box' value={chatInput} onChange={updateChatInput} />
        <button className='sub_butt' type="submit">Send</button>
      </form>
    </>
  );
};

export default MessageMain;
