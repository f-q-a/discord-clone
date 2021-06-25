
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm'
// import './LoginFormModal.css';
import "../css/navigation.css"

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  const [formState, setformState] = useState(true);
//   if (sessionUser) return <Redirect to="/" />;
  const toLogin = async (e) => {
    setformState(true);
  };

  const toSignUp = async (e) => {
    setformState(false)
  };
  return (
    <>
      <button className="LoginButton button" onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {formState ?
          <div>
            <LoginForm />
            <a onClick={toSignUp}>Need to Sign Up?</a>
          </div>
          :
          <div>
            <SignUpForm />
            <a onClick={toLogin}>Already Have An Account?</a>
          </div>}
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
