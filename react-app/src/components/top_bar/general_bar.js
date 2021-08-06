import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, useHistory} from "react-router-dom";
import {getRelationships} from "../../store/relationship"
import GeneralBarModal from "../top_bar/general_bar_modal"
import "../css/general_bar.css"

const GeneralBar = () => {
    const dispatch = useDispatch();
    const {serverId, channelId} = useParams();
    const [specificChannel, setSpecificChannel] =useState();
    const relationshipObject= useSelector((state) => state.relationship.relationships);

    // let specificChannel
    const channel= useSelector((state)=> state.channel.channels[serverId])
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getRelationships());
        if(channel){
            setSpecificChannel(channel[channelId]?.name);
        }
      }, [dispatch, channel, user ]);


    // if(channel){
    //     specificChannel=channel[channelId].name
    // }


    return(
        <>
            {specificChannel &&
            <div className="channel__context">
                <div className="general_bar_content_name">{specificChannel}</div>
                <div className="general_bar_content_button">{relationshipObject && <GeneralBarModal />}</div>
            </div>}

        </>
    )
}

export default GeneralBar;
