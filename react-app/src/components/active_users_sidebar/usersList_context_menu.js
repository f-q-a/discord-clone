import React,{useEffect, useState} from 'react';
import '../css/contextmenu.css'
import ActiveUserFormModal from './userlist_modal'


const items = [
    { text: "Add Friend"},
    { text: "Block User"},
  ]

const ContextMenu = ({parentRef, user}) => {
    const [Visible, setVisible] = useState(false)
    // const [showModal, setShowModal] = useState(false);
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
        <div id='context-menu-popup2' style={style}>
            {items.map((item,index) => {
                return (
                    <div className = "context_menu_popup-items2" key={index}>
                        <ActiveUserFormModal item={item} user={user} />
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
                        <ActiveUserFormModal item={item} user={user} />
                    </div>
                )
            })}
        </div>
}

export default ContextMenu
