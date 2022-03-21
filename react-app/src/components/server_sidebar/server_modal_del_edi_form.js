import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';

import ServerDeleteForm from './server_delete_form'
import ServerEditForm from './server_edit_form'
import ServerAddUserForm from './server_adduser_form'

function ServerFormModal({ item, serverId, setVisible }) {
  const [showModal, setShowModal] = useState(false);//false
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (item.text === "Edit Server Name") {
      setDisplay("Edit")
    }
    else if (item.text === "Delete Server") {
      setDisplay("Delete")
    }
    else if (item.text === "Add Friend") {
      setDisplay("Add")
    }
    // const closeMenu = () => setVisible(false)
  }, [item.text])


  return (
    <>
      <div className="context_menu_popup-items" onClick={() => setShowModal(true)}>{item.text}</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {display === "Delete" ?
            <div>
              <ServerDeleteForm serverId={serverId} />
            </div>
            :
            display === "Edit" ?
              <div>
                <ServerEditForm serverId={serverId} />
              </div>
              :
              display === "Add" ?
                <div>
                  <ServerAddUserForm serverId={serverId} />
                </div>
                :
                null
          }
        </Modal>
      )}
    </>
  );
}

export default ServerFormModal;
