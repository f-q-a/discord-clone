import React, {useRef, useState} from 'react';
import '../css/contextmenu.css'
import ContextMenu from './server_context_menu'
import { Modal } from '../../context/Modal';



const Container = ({ children, serverId }) => {
    const containerRef = useRef(null)
    const [showModal, setShowModal] = useState(false);//false

    return (

        <div className="container" ref={containerRef}>
            {children}
            <ContextMenu parentRef={containerRef} serverId={serverId}  />
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>

            </Modal>)}
        </div>
    );
};

export default Container;
