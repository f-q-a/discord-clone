import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, useHistory} from "react-router-dom";
import {createRelationship} from "../../store/relationship"
import {getRelationships} from "../../store/relationship"
import GeneralBarModal from "../top_bar/general_bar_modal"
import "../css/general_bar.css"

const GeneralBar = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const {serverId, channelId} = useParams();


    const relationshipObject= useSelector((state) => state.relationship.relationships);

    let specificChannel
    let channel= useSelector((state)=> state.channel.channels[serverId])
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getRelationships());
      }, [dispatch]);


    if(channel){
        specificChannel=channel[channelId].name
    }


    return(
        <>
            {specificChannel &&
            <div className="channel__context">
                {specificChannel}
                {relationshipObject && <GeneralBarModal />}
            </div>}

        </>
    )
}

export default GeneralBar;
