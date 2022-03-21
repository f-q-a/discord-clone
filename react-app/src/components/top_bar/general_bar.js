import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {getRelationships} from "../../store/relationship"
import GeneralBarModal from "../top_bar/general_bar_modal"
import "../css/general_bar.css"

const GeneralBar = () => {
    const dispatch = useDispatch();
    const { channelId} = useParams();
    const channel= useSelector(state => state.channel[channelId])
    const [specificChannel, setSpecificChannel] = useState(channel?.name);
    const relationshipObject= useSelector((state) => state.relationship.relationships);
    // console.log(channel, 'chanchanchan', channelId)
    // console.log(useParams())
    // let specificChannel
    // const user = useSelector(state => state.session.user)
    

    useEffect(() => {
        dispatch(getRelationships())
      }, [dispatch]);

    useEffect(()=> {
        if(channel){
            setSpecificChannel(channel?.name);
        }
    }, [channel, channelId])


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
