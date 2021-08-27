import React, {useRef, useState} from 'react';
import '../css/contextmenu.css'
import ContextMenu from './usersList_context_menu'
import { Modal } from '../../context/Modal';
// import ActiveUserFormModal from './userlist_modal'


const Container = ({ children, user}) => {

    const containerRef = useRef(null)
    const [showModal, setShowModal] = useState(false);//false

    return (

        <div className="serverusers_container" ref={containerRef}>
            {children}
            <ContextMenu parentRef={containerRef} user={user}   />
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>

            </Modal>)}
        </div>
    );
};

export default Container;
