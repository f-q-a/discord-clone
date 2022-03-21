import React, {useState} from 'react';
import {Modal} from '../../context/Modal';

import ServerAddForm from './server_add_form';

function ServerFormAddModal({item, serverId}) {
  const [showModal, setShowModal] = useState(false); //false

  return (
    <>
      <div clbuttonssName="server_create__button" onClick={() => setShowModal(true)}>
        <div className="server_create__container">+</div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ServerAddForm serverId={serverId} />
        </Modal>
      )}
    </>
  );
}

export default ServerFormAddModal;
