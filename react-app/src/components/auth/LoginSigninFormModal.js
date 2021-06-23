
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm'
// import './LoginFormModal.css';

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
      <button className="LoginButton" onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {formState ?
          <div>
            <LoginForm />
            <button onClick={toSignUp}>Need to Sign Up?</button>
          </div>
          :
          <div>
            <SignUpForm />
            <button onClick={toLogin}>Already Have An Account?</button>
          </div>}

          <div>SPLIT HERE SPLIT HERE SPLIT HERE SPLIT HERE</div>

        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
