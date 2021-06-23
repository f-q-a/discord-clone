
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm'
// import './LoginFormModal.css';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

//   if (sessionUser) return <Redirect to="/" />;

  return (
    <>
      <button className="LoginButton" onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
          <div>SPLIT HERE SPLIT HERE SPLIT HERE SPLIT HERE</div>
          <SignUpForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
