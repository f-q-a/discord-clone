import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editServer } from '../../store/server'
import "../css/server_edit_form.css";
const ServerEditForm = ({serverId}) => {

  const history = useHistory()
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const onServerEdit= async (e) => {
    e.preventDefault();
    const formData = new FormData();
        formData.append("image", image);

    const data = await dispatch(editServer(serverId,name)).catch(e=>setErrors(e)); //.image
    if (data) {
      history.push(`/`);
    }
  }

  const updateName = (e) => {
    setName(e.target.value);
  }

  const updateImage = (e) => {
    setImage(e.target.value);
  }

  return (
    <div className="ServerEditForm">
      <form onSubmit={onServerEdit} className='server_form'>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div className='server_div'>
          <label htmlFor="name">New Name</label>
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={updateName}
            className='server_input'
          />
        </div>
        <div className='server_div'>
          <label htmlFor="image">New Image</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={updateImage}
            className='server_edit_input_image'
          />
        </div>

        <div className="create">
          <button className="server-button" type="submit">Confirm</button>
        </div>
      </form>
      {/* {serverId} */}
    </div>
  )
}

export default ServerEditForm;
