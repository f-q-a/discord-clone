import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import {createRelationship} from "../../store/relationship"

const UserBar = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    const [password, setPassword] = useState()
    const [relationships, setRelationships] = useState()
    const allButton = (e) => {
        setPassword(e.target.value);
      };

      const pendingButton = (e) => {

      };

      const blockedButton = (e) => {
        setRelationships("Blocked");
      };

      const addFriends = async (e) => {
        e.preventDefault();
        setRelationships("Pending");
        const data = await dispatch(createRelationship(relationships));
      }

    return (

        <div className="channel__context">
            <div> Friends </div>
            <button className="friend-button" onClick={allButton}> All</button>
            <button className="friend-button" onClick={pendingButton}>Pending</button>
            <button className="friend-button" onClick={blockedButton}>Blocked</button>
            <button className="friend-button" onClick={addFriends}>Add Friend</button>
        </div>
    )
}

export default UserBar;
