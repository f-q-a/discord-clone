import React,{useEffect, useState} from 'react';
import '../css/contextmenu.css'

const ContextMenu = ({parentRef, items}) => {
    const [Visible, setVisible] = useState(false)
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

    return Visible? (
        <div className='context-menu' style={style}>
            {items.map((item,index) => {
                return (
                    <div key={index} onClick={item.onClick} className = 'context-menu__item'>
                        {item.text}
                    </div>
                    )
            })}
        </div>
    ): null;
}

export default ContextMenu
