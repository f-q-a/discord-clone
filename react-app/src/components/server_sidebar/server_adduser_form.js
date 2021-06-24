import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { addServerUsers } from '../../store/serveruser'

const ServerAddUserForm = ({serverId}) => {
  const history = useHistory()
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");


    const onServerInvite = async (e) => {
        e.preventDefault();
        const data = await dispatch(addServerUsers(serverId, name));
        console.log("frontend______",data)
        if (data.errors) {
            setErrors(data.errors);
        }
        history.push(`/@me/${serverId}`);
      }
  const updateName = (e) => {
    setName(e.target.value);
  }

  return (
    <form onSubmit={onServerInvite} className='server_form'>
      <div>
        {errors.map((error, i) => (
          <div key={i}>{error}</div>
        ))}
      </div>
      <div className='server_div'>
        <label htmlFor="name">UserName#ID</label>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={updateName}
          className='server_input'
        />
      </div>

      <div className="create">
        <button className="server-button" type="submit">Invite to Server</button>
      </div>
    </form>
  )
}

export default ServerAddUserForm;
