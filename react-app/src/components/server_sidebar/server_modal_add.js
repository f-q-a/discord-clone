import React, {useState} from 'react';
import {Modal} from '../../context/Modal';

import ServerAddForm from './server_add_form';

function ServerFormAddModal({item, serverId}) {
  const [showModal, setShowModal] = useState(false); //false

  return (
    <>
      <a className="server_create__button" onClick={() => setShowModal(true)}>
        <div className="server_create__container">+</div>
      </a>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ServerAddForm serverId={serverId} />
        </Modal>
      )}
    </>
  );
}

export default ServerFormAddModal;
