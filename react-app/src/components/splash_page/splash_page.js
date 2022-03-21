import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import study_group_img from '../../images/study_group.svg'
import splash_right_image from '../../images/splash_right_image.svg'
import main_bottom_image from '../../images/main_bottom_image.svg'
import voice_connect_image from '../../images/voice_connect_image.svg'
import friends_role_image from '../../images/friends_role_image.svg'
import splash_left_image from '../../images/splash_left_image.svg'
import splash_middle_image from '../../images/splash_midde_image.svg'
import NavBar from "./NavBar.js"
import Footer from "../../components/footer/footer"
import "../css/splash_page.css"
const SplashPage = ({setUrl}) => {

    return(
        <div>
            <div className="MainPageABC">
                <div className="NavigationBar">
                    <NavBar setUrl={setUrl}/>
                </div>
                <div className="MainPage_SplashPage1" >
                    <img className="MainPage_SplashPage2-image"src={splash_left_image} alt="splash-left"></img>
                    <img className="MainPage_SplashPage1-image" src={splash_right_image} alt="splash-right"></img>
                </div>
                <div className="MainPage_SplashPage2" >
                    <img className="MainPage_SplashPage3-image" src={splash_middle_image} alt="splash-middle"></img>
                </div>
                <div className="MainPage_SplashPage-text">
                    <h1 >IMAGINE A PLACE...</h1>
                    <h3>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</h3>
                </div>
                <div className="MainPage_StudyGroup" >
                    <img src={study_group_img} alt="study-group"></img>
                </div>
                <div className="MainPage_StudyGroup-text">
                    <h1>Create an invite-only place where you belong</h1>
                    <h3>Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.</h3>
                </div>
                <div className="MainPage_ConnectImage">
                    <img src={voice_connect_image} alt="voice-connect"></img>
                </div>
                <div className="MainPage_ConnectImage-text">
                    <h1>Where hanging out is easy</h1>
                    <h3>Grab a seat in a voice channel when you’re free. Friends in your server can see you’re around and instantly pop in to talk without having to call.</h3>
                </div>
                <div className="MainPage_RoleImage">
                    <img src={friends_role_image} alt="friends-role"></img>
                </div>
                <div className="MainPage_RoleImage-text">
                    <h1>From few to a fandom</h1>
                    <h3>Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more.</h3>
                </div>
                <div className="MainPage_BottomImage-text">
                    <h1>RELIABLE TECH FOR STAYING CLOSE</h1>
                    <h3>Low-latency voice and video feels like you’re in the same room. Wave hello over video, watch friends stream their games, or gather up and have a drawing session with screen share.</h3>
                </div>
                <div className="MainPage_BottomImage">
                    <img src={main_bottom_image} alt='main-bottom'></img>
                </div>
                <div className="MainPage_Footer">
                    <Footer />
                </div>
            </div>

        </div>
    );
}

export default SplashPage;
