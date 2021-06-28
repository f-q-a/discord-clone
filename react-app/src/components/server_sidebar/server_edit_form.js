import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { editServer } from '../../store/server'

const ServerEditForm = ({serverId}) => {

  const history = useHistory()
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  // const [image, setImage] = useState(null);

  const onServerEdit= async (e) => {
    e.preventDefault();
    const formData = new FormData();
        // formData.append("image", image);
        // ,image
    const data = await dispatch(editServer(serverId,name));
    if (data) {
      history.push(`/`);
    }
  }

  const updateName = (e) => {
    setName(e.target.value);
  }

  // const updateImage = (e) => {
  //   const file = e.target.files[0];
  //   setImage(file)
  // }


  return (
    <div>


      <form onSubmit={onServerEdit} className='server_form'>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div className='server_div'>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={updateName}
            className='server_input'
          />
        </div>
        {/* <div className='server_div'>
          <label htmlFor="image">Image</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={updateImage}
            className='server_input_image'
          />
        </div> */}

        <div className="create">
          <button className="server-button" type="submit">Edit Server</button>
        </div>
      </form>
      {serverId}
    </div>
  )
}

export default ServerEditForm;
