import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import study_group_img from '../../images/study_group.svg'
import splash_right_image from '../../images/splash_right_image.svg'
import main_bottom_image from '../../images/main_bottom_image.svg'
import voice_connect_image from '../../images/voice_connect_image.svg'
import friends_role_image from '../../images/friends_role_image.svg'
import splash_left_image from '../../images/splash_left_image.svg'
import splash_middle_image from '../../images/splash_midde_image.svg'

const SplashPage = () => {

    return(
        <div className="MainPage">
            <h1>SPLASH</h1>
            <div className="MainPage_SplashPage1" >
                <img src={splash_right_image}></img>
                <img src={splash_left_image}></img>
                <img src={splash_middle_image}></img>
            </div>
            <div>
                <img src={study_group_img}></img>
            </div>
            <div></div>
            <img src={voice_connect_image}></img>
            <img src={friends_role_image}></img>

            <img src={main_bottom_image}></img>
        </div>
    );
}

export default SplashPage;
