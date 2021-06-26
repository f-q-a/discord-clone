import React from 'react';
import { useHistory } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import LoginFormModal from '../auth/LoginSigninFormModal';
// import OpenAppButton from '../auth/OpenAppButton'
import "../css/navigation.css"


const NavBar = () => {
  return (
    <div className="Navigation Navigation__grid">
      <div className="Navigation_LoginForm">
        <LoginFormModal/>
      </div>
      <div className="Navigation_OpenApp">
        <OpenAppButton />
      </div>
    </div>
  );
}

const OpenAppButton = () => {
  let history = useHistory();

  const redirect = () => {
      history.push('/')
    }

return <button className="OpenButton button" onClick={redirect}>Open App in Your Browser</button>;
};

export default NavBar;
