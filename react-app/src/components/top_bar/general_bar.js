import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, useHistory} from "react-router-dom";
import {createRelationship} from "../../store/relationship"
import {getRelationships} from "../../store/relationship"
import GeneralBarModal from "../top_bar/general_bar_modal"
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


    // const allButton = (e) => {
    //     setPassword(e.target.value);
    //   };

    // const pendingButton = (e) => {

    // };

    // const blockedButton = (e) => {
    //   setRelationships("Blocked");
    // };

    // const addFriends = async (e) => {

    //   setRelationships("Pending");
    //   const data = await dispatch(createRelationship(relationships));
    // }

    return(
        <>
            {specificChannel &&
            <div className="channel__context">
                {specificChannel}
                {relationshipObject && <GeneralBarModal props={relationshipObject}/>}
            </div>}

        </>
    )
}

export default GeneralBar;
