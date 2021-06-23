import React from 'react';

function Messages({message}) {
  const timeNow = new Date();
  const messageDate = new Date(message.created_at);
  const messageLocalTime = Date(message.created_at).toLocaleString();
  const messageDay = messageDate.getDate();
  const messageMonth = messageDate.getMonth();
  const messageHours = messageDate.getHours();
  const messageMinutes = messageDate.getMinutes();

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
    return `${monthParse(
      messageMonth
    )} ${messageDay}, ${messageHours}:${messageMinutes}`;
  }

  console.log(message);

  return (
    <div className="message__div">
      <div className="message_avatar__div">
        <img className="message_avatar__img" src={`${message.user_avatar}`} />
      </div>
      <div clasName="message_username_date__div">
        <span className="message_username__span">{`${message.username} `}</span>
        <span className="message_timestamp__span">
          {timeConvert(Date.now() - new Date(message.created_at))}
        </span>
      </div>
      <div className="message_content__div">{message.content}</div>
      <div className="message_context__div">EDIT/REACT</div>
    </div>
  );
}

export default Messages;
