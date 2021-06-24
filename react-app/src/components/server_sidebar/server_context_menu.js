import React,{useEffect, useState} from 'react';
import '../css/contextmenu.css'
import ServerFormModal from './server_modal_del_edi_form'


const items = [
    { text: "Add Friend"},
    { text: "Edit Server Name"},
    { text: "Delete Server" }
  ]

const ContextMenu = ({parentRef, serverId}) => {
    {console.log("WHERE________",parentRef.current)}
    const [Visible, setVisible] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [Y, setY] = useState(0)
    const [X, setX] = useState(0)
    useEffect(()=>{
        const parent = parentRef.current;
        if (!parent) {
            return;
        }

        const showMenu = (e) => {
            e.preventDefault();
            setVisible(true)
            setX(e.clientX)
            setY(e.clientY)
        };

        const closeMenu =(e) => {
            setVisible(false)
        }

        parent.addEventListener('contextmenu',showMenu);
        window.addEventListener('click',closeMenu);

        return function cleanup() {
            parent.removeEventListener('contextmenu',showMenu);
            window.removeEventListener('click',closeMenu);
        }
    });

    const style = {
        top:Y,
        left:X,
    }

    const style1 = {
        visibility: "hidden"
    }

    // This part here is Jank in that the Modal will not show because it the component closes therefore on the
    // turnary i created the component but simply hid it away
    return Visible?
    (
        <div className='context-menu' style={style}>
            {items.map((item,index) => {
                return (
                    <div key={index}>
                        <ServerFormModal item={item} serverId={serverId} />
                    </div>
                )
            })}
        </div>
    )
    :
    <div className='context-menu' style={style1}>
            {items.map((item,index) => {
                return (
                    <div key={index}>
                        <ServerFormModal item={item} serverId={serverId} />
                    </div>
                )
            })}
        </div>
}

export default ContextMenu
