import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { deleteServer } from '../../store/server'
import "../css/server_delete_form.css"

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
    <div className="DeleteForm_ModalContent">
      <div className="DeleteForm_ModalContent-titleholder">
        <h3 id="DeleteForm_ModalContent-title"> Delete this server? </h3>
      </div>  {/* {serverId} */}
      <button className="server-delete-button" onClick={onDelete}>Confirm Delete</button>
    </div>
  )
}

export default ServerDeleteForm;
