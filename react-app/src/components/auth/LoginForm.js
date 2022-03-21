import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import "../css/LoginLogoutForm.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
    else history.push('/channels/@me')
  };

  const handleDemoSubmit = async () => {
    let email = setEmail('demo@aa.io')
    let password = setPassword('password')
    const data = await dispatch(login(email, password))
    if (data.errors) {
      setErrors(data.errors);
    }
    else history.push('/channels/@me')

  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/channels/@me" />;
  }

  return (
    <div className="LoginFormContainer">
      <form onSubmit={onLogin}>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
        </div>
        <button type="submit">Login</button>
        <button className="form-button-modals" type="submit" onClick={handleDemoSubmit}>Demo User</button>
      </form>

    </div>
  );
};

export default LoginForm;
