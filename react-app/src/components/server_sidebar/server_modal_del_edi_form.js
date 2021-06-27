import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';

import ServerDeleteForm from './server_delete_form'
import ServerEditForm from './server_edit_form'
import ServerAddUserForm from './server_adduser_form'

function ServerFormModal({item,serverId}) {
  const [showModal, setShowModal] = useState(false);//false
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    if (item.text === "Edit Server Name" || item.text === "Delete Server"){
      setDisplay(true)
    }
    else if (item.text==="Add Friend") {
      setDisplay(false)
    }
  },[])


  return (
    <>
        <a className="Context_Menu--items" onClick={() => setShowModal(true)}>{item.text}</a>
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            {display ?
            <div>
              <ServerDeleteForm serverId={serverId}/>
              <ServerEditForm serverId={serverId}/>
            </div>
            :
            <div>
               <ServerAddUserForm serverId ={serverId}/>
            </div>
            }
        </Modal>
        )}
    </>
  );
}

export default ServerFormModal;
