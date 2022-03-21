
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm'
// import './LoginFormModal.css';
import "../css/navigation.css"
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  const [formState, setformState] = useState(true);
  const user = useSelector(state => state.session.user)
  const history = useHistory()
//   if (sessionUser) return <Redirect to="/" />;
  const toLogin = async (e) => {
    setformState(true);
  };

  const toSignUp = async (e) => {
    setformState(false)
  };

  function loginButtonAction(){
    if (user) history.push('/channels/@me')
    else setShowModal(true)
  }

  return (
    <>
      <button className="LoginButton button" onClick={loginButtonAction}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {formState ?
          <div>
            <h3 className="ButtonLink" >Login In</h3>
            <LoginForm />
            <div   className="ButtonLink" onClick={toSignUp}>Need to Sign Up?</div>
          </div>
          :
          <div>
            <h3 className="ButtonLink" >Sign Up</h3>
            <SignUpForm />
            <div className="ButtonLink"onClick={toLogin}>Already Have An Account?</div>
          </div>}
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
