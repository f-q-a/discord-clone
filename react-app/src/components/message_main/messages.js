import React from 'react'

function Messages({message}){
  const timeNow = Date();
  const messageLocalTime = Date(message.created_at).toLocaleString()
  const messageDay = Date(messageLocalTime).getDate()
  const messageMonth = parseInt(Date(messageLocalTime).getMonth())
  const messageHours = Date(messageLocalTime).getHours()
  const messageMinutes = Date(messageLocalTime).getMinutes()

  function monthParse(monthNum){
    switch(monthNum){
      case 1:
        return 'January'
      case 2:
        return 'February'
      case 3:
        return 'March'
      case 4:
        return 'April'
      case 5:
        return 'May'
      case 6:
        return 'June'
      case 7:
        return 'July'
      case 8:
        return 'August'
      case 9:
        return 'September'
      case 10:
        return 'October'
      case 11:
        return 'November'
      case 12:
        return 'December'
    }
  }


  return (
    <div className='message__div'>
      <div className='message_avatar__div'>
        <img className='message_avatar__img' src={message.user_avatar} />
      </div>
      <div className='message_timestamp__div'>
        {`${monthParse(messageMonth)} ${messageDay}, `}
      </div>
      <div className='message_content__div'>
        {message.content}
      </div>
    </div>
  )
}
