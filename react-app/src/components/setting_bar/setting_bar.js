import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import headphone from '../../images/headphone.png'
import microphone from '../../images/microphone.png'
import SettingsBarModal from '../setting_bar/settings_bar_modal'
import "../css/setting_bar.css"
import defaultLogo from "../../images/default.png"

const SettingBar = () => {

    const user = useSelector(state => state.session.user)

    return(
        <div className ="user_status_bar">
            <div>
                <div>
                    {user.avatar_link ? <img className="settingbar_icon" src={user.avatar_link}/> : <img className="settingbar_icon" src={defaultLogo}/>}
                </div>
                <div>

                    {user.username}#{user.id}
                </div>
            </div>
            <div>
                <div>
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                        <img className="settingbar_icon" src={ headphone }/>
                    </a>
                </div>
                <div>
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                        <img className="settingbar_icon" src={ microphone }/>
                    </a>
                </div>
                <div>
                    <SettingsBarModal />
                </div>
            </div>
        </div>
    )
}

export default SettingBar;
