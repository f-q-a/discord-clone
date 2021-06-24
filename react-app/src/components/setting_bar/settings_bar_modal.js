import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import setting from '../../images/settings.png'
import "../css/setting_bar.css"
import UserEditForm from "./setting_bar_form"
function SetttingsBarModal() {
  const [showModal, setShowModal] = useState(false);//false

  return (
    <>
        <img className="settingbar_icon" src={setting}  onClick={() => setShowModal(true)}></img>
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UserEditForm />
        </Modal>
        )}
    </>
  );
}

export default SetttingsBarModal;
