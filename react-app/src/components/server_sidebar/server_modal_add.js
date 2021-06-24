import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

import ServerEditForm from './server_add_form'

function ServerFormEditModal({item, serverId}) {
  const [showModal, setShowModal] = useState(false);//false

  return (
    <>
        <a className="LoginButton" onClick={() => setShowModal(true)}>THIS IS THE CREATE SERVERS BUTTON</a>
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <ServerEditForm serverId={serverId}/>
        </Modal>
        )}
    </>
  );
}

export default ServerFormEditModal;
