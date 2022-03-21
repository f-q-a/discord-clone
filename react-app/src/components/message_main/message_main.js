import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import * as messageActions from '../../store/message';
import Messages from './messages';


let socket;

const MessageMain = () => {
  const latest = useRef();
  const dispatch = useDispatch();

  let { serverId, channelId } = useParams();
  console.log(serverId)
  console.log(channelId)
  const user = useSelector((state) => state.session.user);
  // const server = useSelector((state) => state.server)
  const messages = useSelector(state => state.message)
  // const msgCopy = [].concat(messages)
  // const serverType = Object.values(server);

  const [chatInput, setChatInput] = useState('');
  // const [channelMessages, setChannelMessages] = useState([...msgCopy]);
  const [reload, setReload] = useState(false)
  const channelMessages = Object.values(messages)


  useEffect(()=>{
    localStorage.setItem(serverId, channelId)
  },[channelId, serverId])

  useEffect(() => {
    dispatch(messageActions.getMessages(channelId))
    socket = io();
    socket.emit('join', { channelId: channelId, username: user.username });

    socket.on('chat', (chat) => {
      // setChannelMessages((channelMessages) => [...channelMessages, chat]);
      // console.log();
      // dispatch(messageActions.createMessage(chat));
      chat = JSON.parse(chat)
      chat.updated_at = new Date()
      chat.created_at = new Date()
      dispatch(messageActions.updateChannelMessagesAction(channelId, chat))
    });

    return () => {
      socket.disconnect();
      dispatch(messageActions.clearMessagesAction());
    };
  }, [dispatch, channelId, user.username]);

  useEffect(() => {
    if (latest.current) {

      latest.current.scrollIntoView()
      console.log('ref', latest.current)
    }
  })

  const updateChatInput = (e) => {
    e.preventDefault();
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit('chat', {
      "user": user,
      "user_id": user.id,
      "content": chatInput,
      "channelId": channelId,
      "user_avatar": user.avatar_link,
      "username": user.username,
      "created_at": Date(),
    });
    // dispatch(messageActions.createMessage(channelId, chatInput));
    setChatInput("")
    // setChannelMessages("")
    setReload(true)
  };

  // function timeConvert(time) {
  //   const seconds = parseInt(time / 1000);
  //   const minutes = parseInt(time / (1000 * 60));
  //   const hours = parseInt(time / (1000 * 60 * 60));
  //   const days = parseInt(time / (1000 * 60 * 60 * 24));

  //   if (seconds < 60) return seconds + ' seconds ago';
  //   else if (minutes < 60) return minutes + ' minutes ago';
  //   else if (hours < 24) return hours + ' hours ago';
  //   else return days + ' days ago';
  // }

  if (latest) console.log(latest);

  // const AlwaysScrollToBottom = () => {
  //   const elementRef = useRef();
  //   useEffect(() => elementRef.current.scrollIntoView(), []);
  //   return <div ref={elementRef} ></div>;
  // };

  function gotoBottom() {
    if (latest.current)
      latest.current.scrollTop = latest.current.scrollHeight - latest.current.clientHeight;
  }

  return (
    <>


      <div className="messages_body__div" id='scrollyboi'>
        {/* {channelMessages &&
          channelMessages
          .map((message, index) => (
            <div className="message__div">
            message={message.content} username={message.username} key=
            {index} timestamp={timeConvert(Date.now() - new Date(message.created_at))}
            </div>
            ))
          .reverse()} */}
        {channelMessages ? (<div>
          {channelMessages.map((message, index) => (
            <div className="message__div" ref={latest}>
              <Messages props={{ message, index, reload, setReload, channelMessages, serverId, channelId }} key={message} />
            </div>
          ))}
        </div>) :
          (<div>
            Loading....
          </div>)}

        {/* <div ref={latest}/> */}
      </div>

      <form onSubmit={sendChat} className="chat_box">
        <input
          className="text__box"
          value={chatInput}
          onChange={updateChatInput}
        />
      </form>
      <div className="chat_end" />
      {gotoBottom()}
    </>
  );
};

export default MessageMain;
