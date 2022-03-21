import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addServerUsers } from '../../store/serveruser'
import "../css/server_add_form.css";
const ServerAddUserForm = ({serverId}) => {
  const history = useHistory()
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");


    const onServerInvite = async (e) => {
        e.preventDefault();
        const data = await dispatch(addServerUsers(serverId, name));
        // console.log("frontend______",data)
        if (data.errors) {
            setErrors(data.errors);
        }
        history.push(`/@me/${serverId}`);
      }
  const updateName = (e) => {
    setName(e.target.value);
  }

  return (
    <div classname="AddForm_ModalContent">
      <div>
        <form onSubmit={onServerInvite} className='server_form'>
          <div>
            {errors.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
          <div className='server_div'>
            <label htmlFor="name"></label>
            <input
              name="name"
              type="text"
              placeholder="UserName#ID"
              value={name}
              onChange={updateName}
              className='server_input'
            />
          </div>
        </form>
      </div>

      <div className="create">
        <button className="server-button" type="submit">Invite to Server</button>
      </div>
      
    </div>
  )
}

export default ServerAddUserForm;
