import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/splash_page/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/splash_page/UsersList";
import ChannelsList from "./components/server_channels/channels_list";
import User from "./components/splash_page/User";
import SplashPage from "./components/splash_page/splash_page";
import MessageMain from "./components/message_main/message_main";
import MainApp from "./components/app_container/main_app";
import ServerUsers from "./components/active_users_sidebar/active_users_sidebar"
import { authenticate } from "./store/session";
import Chat from "./components/chat/chat";

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }
 
  // bill test <NavBar />
  return (
    <BrowserRouter>
      <Route path="/splash-page" exact={true}>
        <SplashPage />
      </Route>

      <div className="app__container">
        <Route path="/login" exact={true}>
          {/* <LoginForm /> */}

        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/" exact={true}>
          <MainApp />
        </ProtectedRoute>
        <ProtectedRoute path="/@me/:serverId">
          <ChannelsList />
          <ServerUsers />
        </ProtectedRoute>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/@me/:serverId/:channelId">
          <MessageMain />
        </Route>
        <ProtectedRoute path="/chat">
          <Chat />
        </ProtectedRoute>
      </div>
    </BrowserRouter>
  );
}

export default App;
