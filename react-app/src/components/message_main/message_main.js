import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router';
import React, {useEffect, useState, useRef} from 'react';
import {io} from 'socket.io-client';
import * as messageActions from '../../store/message';
import Messages from './messages';

// import { Redirect } from "react-router-dom";
let socket;

const MessageMain = () => {
  const latest = useRef();
  const dispatch = useDispatch();

  let { serverId, channelId } = useParams();

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
  }, [dispatch, channelId]);

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

  if (latest) console.log(latest);

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView(), []);
    return <div ref={elementRef} ></div>;
  };

  function gotoBottom(){
    if(latest.current)
    latest.current.scrollTop = latest.current.scrollHeight - latest.current.clientHeight;
 }

  return (
    <>
      <div className="channel__context">MESSAGES CONTAINER</div>

      <div className="messages_body__div" ref={latest} id='scrollyboi'>
        {/* {channelMessages &&
          channelMessages
          .map((message, index) => (
            <div className="message__div">
            message={message.content} username={message.username} key=
            {index} timestamp={timeConvert(Date.now() - new Date(message.created_at))}
            </div>
            ))
          .reverse()} */}
        {channelMessages &&
          channelMessages.map((message, index) => (
            <div className="message__div">
              <Messages props={{message, index}} key={index} />
            </div>
          ))}
          <AlwaysScrollToBottom />
      </div>

      <form onSubmit={sendChat} className="chat_box">
        <input
          className="text__box"
          value={chatInput}
          onChange={updateChatInput}
        />
      </form>
      <div className="chat_end" />
    {  gotoBottom()}
    </>
  );
};

export default MessageMain;
