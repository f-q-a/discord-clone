import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";

const GeneralBar = () => {
    const {serverId, channelId} = useParams();
    console.log(channelId)
    let specificChannel
    let channel= useSelector((state)=> state.channel.channels[serverId])

    if(channel){
        // channel.filter((el) => (el.id ===  Number(channelId)))
        specificChannel=channel[channelId].name

    }

    console.log("current11111", specificChannel)



    // const currentPosition = specific.filter((position) => (position.id === serverId))

    return(
        <>
            {specificChannel && <div className="channel__context">{specificChannel}</div>}
        </>
    )
}

export default GeneralBar;
