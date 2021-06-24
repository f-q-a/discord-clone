import React, {useRef} from 'react';
import '../css/contextmenu.css'
import ContextMenu from './server_context_menu'

const Container = ({ children, menuItems }) => {
    const containerRef = useRef(null)

    return (
        <div className="container" ref={containerRef}>
            {children}
            <ContextMenu parentRef={containerRef}  items= {menuItems} />
        </div>
    );
};

export default Container;
