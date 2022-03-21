import React from 'react'
import whumpus_image from '../../images/Wumpus.png'

export default function PrivateMessagesList() {
  return (
    <>
      <div className="channels__list">
        <div className="server_title--channel_list__div">Direct Messages</div>
        {/* {(user && user.id === server.user_id) ? (channelsList && */}
        <div className="text_channels channel_list__div">
          <p className="text_channels_paragraph">Feature coming soon!</p>
          <p className="text_channels_paragraph">In the mean time, choose a server on the left or create a new one to get started</p>
        </div>
      </div>
      <img className="whumpus" src={whumpus_image} alt='whumpus'></img>
    </>

  )
}