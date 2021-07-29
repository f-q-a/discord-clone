import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';

import AddUserForm from "./add_user_form"
import BlockUserForm from "./block_user_form"

function ActiveUserFormModal({item,user}) {
  const [showModal, setShowModal] = useState(false);//false
  const [display, setDisplay] = useState(true);
  console.log("ContainerPROPS", {user} )
  useEffect(() => {
    if (item.text === "Block Friend"){
      setDisplay(true)
    }
    else if (item.text==="Add Friend") {
      setDisplay(false)
    }
  },[])





  return (
    <>
        <a className="context_menu_popup-items" onClick={() => setShowModal(true)}>{item.text}</a>
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            {display ?
            <div>
              <BlockUserForm user={user} setShowModal={setShowModal}/>
            </div>
            :
            <div>
               <AddUserForm user ={user} setShowModal={setShowModal}/>
            </div>
            }
        </Modal>
        )}
    </>
  );
}

export default ActiveUserFormModal;