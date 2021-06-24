import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

import ServerDeleteForm from './server_delete_form'
function ServerFormModal({item, serverId}) {
  const [showModal, setShowModal] = useState(false);//false

  return (
    <>
        <a className="LoginButton" onClick={() => setShowModal(true)}>{item.text}</a>
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <ServerDeleteForm serverId={serverId}/>
        </Modal>
        )}
    </>
  );
}

export default ServerFormModal;
