import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router';
import React, {useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import * as messageActions from '../../store/message';

// import { Redirect } from "react-router-dom";
let socket;

const MessageMain = () => {
  const dispatch = useDispatch();

  let {channelId} = useParams();

  const user = useSelector((state) => state.session.user);

  const [chatInput, setChatInput] = useState('');
  const [channelMessages, setChannelMessages] = useState([]);

  useEffect(() => {
    dispatch(messageActions.getMessages(channelId)).then((data) =>
      setChannelMessages(data)
    );

    socket = io();
    socket.emit('join', {channelId: channelId, username: user.username});

    socket.on('chat', (chat) => {
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
    socket.emit('chat', {
      user: user,
      content: chatInput,
      channelId: channelId,
      user_avatar: user.user_avatar,
      username: user.username,
      created_at: Date(),
    });
    dispatch(messageActions.createMessage(chatInput, channelId));
    setChatInput('');
  };

  function timeConvert(time) {
    const seconds = parseInt(time / 1000);
    const minutes = parseInt(time / (1000 * 60));
    const hours = parseInt(time / (1000 * 60 * 60));
    const days = parseInt(time / (1000 * 60 * 60 * 24));

    if (seconds < 60) return seconds + ' seconds ago';
    else if (minutes < 60) return minutes + ' minutes ago';
    else if (hours < 24) return hours + ' hours ago';
    else return days + ' days ago';
  }
  channelMessages.forEach((e) => {
    console.log(timeConvert(Date.now() - Date.parse(e.created_at)));
    let messageDate = new Date(e.created_at);
    console.log(messageDate.getDate());
  });

  return (
    <>
      <div className="channel__context">MESSAGES CONTAINER</div>
      <div className="messages_body__div">
        {channelMessages &&
          channelMessages
            .map((message, index) => (
              <div className="message__div">
                message={message.content} username={message.username} key=
                {index} timestamp={timeConvert(Date.now() - new Date(message.created_at))}
              </div>
            ))
            .reverse()}
      </div>
      <form onSubmit={sendChat} className="chat_box">
        <input
          className="text__box"
          value={chatInput}
          onChange={updateChatInput}
        />
        <button className="sub_butt" type="submit">
          Send
        </button>
      </form>
    </>
  );
};

export default MessageMain;
