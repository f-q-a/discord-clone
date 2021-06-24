import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
// import { editServer } from '../../store/server'

const UserEditForm = ({serverId}) => {
  const history = useHistory()
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onProfileEdit= async (e) => {
    e.preventDefault();
    const formData = new FormData();
        // formData.append("image", image);
        // ,image
    // const data = await dispatch(editUser(name));
    // if (data) {
      // history.push(`/`);
    // }
  }

  const updateName = (e) => {
    setName(e.target.value);
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onProfileEdit} className='server_form'>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div className='server_div'>
          <label htmlFor="name">Change UserName</label>
          <input
            name="UserName"
            type="text"
            placeholder="UserName"
            value={name}
            onChange={updateName}
            className='server_input'
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div className='server_div'>
          <label htmlFor="image">Change Profile Image</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={updateImage}
            className='server_input_image'
          />
        </div>
        <div>
          <label>Password</label>
          <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
          ></input>
        </div>
        <div>
          <label>Repeat Password</label>
          <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          ></input>
        </div>

        <div className="create">
          <button className="server-button" type="submit">Submit</button>
        </div>
      </form>

    </div>
  )
}

export default UserEditForm ;
