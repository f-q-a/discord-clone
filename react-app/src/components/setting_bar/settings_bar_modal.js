import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import setting from '../../images/settings.png'
import "../css/setting_bar.css"
import UserEditForm from "./setting_bar_form"
import LogoutButton from '../auth/LogoutButton';




function SettingsBarModal() {
  const [showModal, setShowModal] = useState(false);//false

  return (
    <>
        <img className="settingbar_icon" alt='gear' src={setting}  onClick={() => setShowModal(true)}></img>
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UserEditForm />
          <LogoutButton />
        </Modal>
        )}
    </>
  );
}

export default SettingsBarModal;
