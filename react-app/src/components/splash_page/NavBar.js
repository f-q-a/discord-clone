import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
// import { NavLink, Redirect } from 'react-router-dom';
import LoginFormModal from '../auth/LoginSigninFormModal';
// import OpenAppButton from '../auth/OpenAppButton'
import "../css/navigation.css"




const NavBar = ({ setUrl }) => {
  const user = useSelector(state => state.session.user)
  const [error, setError] = useState("")
  const history = useHistory()

  function redirect() {
    if (user) history.push('/channels/@me')
    else {
      setError("You must log in before app can open!")
      setTimeout(() => {
        setError("")
      }, 3500)
    }
  }

  return (
    <div className="Navigation Navigation__grid">
      <div className="Navigation_LoginForm">

        <LoginFormModal />
      </div>
      <div className="Navigation_OpenApp">
        {!error ? <button className="OpenButton button" onClick={redirect}>Open App in Your Browser</button> :
          <div className={`login_notification ${error ? 'showing' : 'hiding'}`}>
            <h3>{error}</h3>
          </div>}
      </div>
    </div>
  );
}

export default NavBar;
