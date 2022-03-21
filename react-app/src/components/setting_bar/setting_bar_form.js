import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editUser } from '../../store/session'

const UserEditForm = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  // const [userId, setUserId] = useState(user.id);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  // const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onProfileEdit = async (e) => {
    e.preventDefault();
    const data = await dispatch(editUser({ userId: user.id, username, email, password, repeatPassword, image }));
    if (data.errors) setErrors(data.errors)
    history.push(`/channels/@me`);
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
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
      <form onSubmit={onProfileEdit} className='server_form modalbackground'>
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
            value={username}
            onChange={updateUsername}
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
          {/* {(imageLoading) && <p>Loading...</p>} */}
        </div>
      </form>

    </div>
  )
}

export default UserEditForm;
