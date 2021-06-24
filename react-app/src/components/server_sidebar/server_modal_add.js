import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

import ServerAddForm from './server_add_form'

function ServerFormAddModal({item, serverId}) {
  const [showModal, setShowModal] = useState(false);//false

  return (
    <>
        <a className="LoginButton" onClick={() => setShowModal(true)}>THIS IS THE CREATE SERVERS BUTTON</a>
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <ServerAddForm serverId={serverId}/>
        </Modal>
        )}
    </>
  );
}

export default ServerFormAddModal;
