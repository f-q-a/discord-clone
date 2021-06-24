import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { deleteServer } from '../../store/server'

const ServerDeleteForm = ({serverId}) => {
  const history = useHistory()
  const dispatch = useDispatch();

  const server_id = useSelector(state => state.server.servers)
    console.log(server_id)

  const onDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteServer());
    await history.push("/");
    }


  return (
    <div>
        <div>Delete</div>
        {serverId}
        <button className="server-button-delete" onCLick={onDelete}>Please Confirm?</button>
    </div>
  )
}

export default ServerDeleteForm;
