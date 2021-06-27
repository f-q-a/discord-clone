import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteMessage } from '../../store/message';
import EditMessage from './edit_message'
import ReactMessage from './react_message'

function Messages({ props }) {
  const { message, index, current } = props
  const dispatch = useDispatch()
  const [editMessage, setEditMessage] = useState(false);
  const [reactMessage, setReactMessage] = useState(false)
  const timeNow = new Date();
  const messageDate = new Date(message.created_at);
  const messageLocalTime = Date(message.created_at).toLocaleString();
  const messageDay = messageDate.getDate();
  const messageMonth = messageDate.getMonth();
  let messageHours = messageDate.getHours();
  let messageMinutes = messageDate.getMinutes();


  const deleteMessage = (e) => {
    e.preventDefault();
    dispatch(deleteMessage(message))
  }
  useEffect(() => {
  }, [])

  function monthParse(monthNum) {
    switch (monthNum) {
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November';
      case 12:
        return 'December';
    }
  }


  function timeConvert(time) {
    const seconds = parseInt(time / 1000);
    const minutes = parseInt(time / (1000 * 60));
    const hours = parseInt(time / (1000 * 60 * 60));
    const days = parseInt(time / (1000 * 60 * 60 * 24));
    const month = monthParse(messageMonth);
    let date;
    let meridian;
    if (messageMonth === timeNow.getMonth() && messageDay === timeNow.getDate())
      date = 'Today';
    else if (
      messageMonth === timeNow.getMonth() &&
      messageDay === timeNow.getDate() - 1
    )
      date = 'Yesterday';
    else if (
      messageMonth === timeNow.getMonth() &&
      messageDay === timeNow.getDate() - 2
    )
      date = 'Ereyesterday';
    else {
      if (messageDay < 10) messageDay = '0' + messageDay;
      date = `${month} ${messageDay}, `;
    }
    // if (seconds < 60) return seconds + ' seconds ago';
    // else if (minutes < 60) return minutes + ' minutes ago';
    // else if (hours < 24) return hours + ' hours ago';
    // else if (days < 7) return days + ' days ago';
    if (messageHours > 12) {
      meridian = 'PM';
      messageHours -= 12;
    }
    else meridian = 'AM'
    if (messageMinutes < 10) messageMinutes = '0' + messageMinutes
    return `${monthParse(
      messageMonth
    )} ${messageDay} at ${messageHours}:${messageMinutes} ${meridian}`;
  }



  return (
    // <div className={`message__div author_${message.username}`} id={`${index}`}>
    <>
      <div className="message_avatar__div">
        <img className="message_avatar__img" src={`${message.user_avatar}`} />
      </div>
      <div clasName="message_username_date__div">
        <span className="message_username__span">{`${message.username} `}</span>
        <span className="message_timestamp__span">
          {timeConvert(Date.now() - new Date(message.created_at))}, {index}
        </span>
      </div>
      <div className="message_content__div">{message.content}</div>
      <div className="message_context__div">
        <button onClick={(() => {
          if (reactMessage) {
            setReactMessage(false)
          }
          setEditMessage(!editMessage);
        })}>EDIT</button>
        {editMessage && <EditMessage props={{ currMessage: message }} />}
        <button onClick={(() => {
          if (editMessage) {
            setEditMessage(false)
          }
          setReactMessage(!reactMessage);
        })}>REACT</button>
        {reactMessage && <ReactMessage props={{ currMessage: message }} />}
        <button onClick={deleteMessage}>DELETE</button>
      </div>
    </>
    // </div>
  );
}

export default Messages;
