import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createServer } from '../../store/server'

const ServerAddForm = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);


  const onServerCreation = async (e) => {
    e.preventDefault();
    const formData = new FormData();
        formData.append("image", image);

    const data = await dispatch(createServer(name, image)).catch(e=>setErrors(e));
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
    <form onSubmit={onServerCreation} className='server_form'>
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
      <div className='server_div'>
        <label htmlFor="image">Image</label>
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={updateImage}
          className='server_input_image'
        />
      </div>

      <div className="create">
        <button className="server-button" type="submit">Create Server</button>
      </div>
    </form>
  )
}

export default ServerAddForm;
