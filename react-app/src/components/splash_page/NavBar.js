import React from 'react';
import { useHistory } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
// import OpenAppButton from '../auth/OpenAppButton'

import "../css/navigation.css"
const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <OpenAppButton />
        </li>
        <li>
          <LoginButton />
          {/* <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink> */}
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li> */}
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

const OpenAppButton = () => {
  let history = useHistory();

  const redirect = () => {
      history.push('/')
    }


return <button onClick={redirect}>Open App in Your Browser</button>;
};

const LoginButton = () => {
  let history = useHistory();

  const redirect = () => {
      history.push('/')
    }


return <button onClick={redirect}>Login</button>;
};


export default NavBar;
