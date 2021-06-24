import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { deleteServer } from '../../store/server'

const ServerDeleteForm = ({serverId}) => {
  const history = useHistory()
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  const onDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteServer(serverId));
    await history.push("/@me/");
    }

  return (
    <div>
        <div>Delete</div>
        {serverId}
        <form onSubmit={onDelete} className='delete_form'>
          <button className="server-button" type="submit">Delete</button>
        </form>
    </div>
  )
}

export default ServerDeleteForm;
