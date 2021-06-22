import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import study_group from '../../images/study_group.svg'
import study_group1 from '../../images/8a8375ab7908384e1fd6efe408284203.svg'


const SplashPage = () => {

    return(
        <div>
            <h1>SPLASH</h1>
            <img src={study_group}></img>
            <img src={study_group1}></img>
        </div>
    );
}

export default SplashPage;
