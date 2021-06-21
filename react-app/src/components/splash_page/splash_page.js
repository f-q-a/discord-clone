import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import study_group from '../../images/study_group.svg'

const SplashPage = () => {

    return(
        <div>
            <h1>SPLASH</h1>
            <img src={study_group}></img>
        </div>
    );
}

export default SplashPage;
