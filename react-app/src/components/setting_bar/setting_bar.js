import React from "react";
import { useSelector } from "react-redux";
// import { Redirect, NavLink } from "react-router-dom";
import headphone from '../../images/headphone.png'
import microphone from '../../images/microphone.png'
import SettingsBarModal from '../setting_bar/settings_bar_modal'
import "../css/setting_bar.css"
import defaultLogo from "../../images/default.png"

const SettingBar = () => {

    const user = useSelector(state => state.session.user)

    return (
        <div className="user_status_bar">

            <div> {user.avatar_link ? <img className="settingbar_icon" src={user.avatar_link} alt='avatar' /> : <img className="settingbar_icon" src={defaultLogo} alt='avatar'/>} </div>
            <div id="settingbar_name">
                <div id="settingbar_username"> {user.username} </div>
                <div id="settingbar_userid"> #{user.id} </div>
            </div>


            <div>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                    <img className="settingbar_icon" src={headphone} alt="headphone" />
                </a>
            </div>
            <div>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                    <img className="settingbar_icon" src={microphone} alt="microphone" />
                </a>
            </div>
            <div>
                <SettingsBarModal />
            </div>

        </div>

    )
}

export default SettingBar;
