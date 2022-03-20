import React from 'react'

export default function PrivateMessagesList(){
    return (
        <div className="channels__list">
        <div className="server_title--channel_list__div">Direct Messages</div>
        {/* {(user && user.id === server.user_id) ? (channelsList && */}
        <div className="text_channels channel_list__div">
          <p className="text_channels_paragraph">Feature coming soon!</p>
          <p className="text_channels_paragraph">In the mean time, choose a server on the left to get started</p>
          
        </div>
      </div>
    )
}