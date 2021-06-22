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
import { authenticate } from "./store/session";

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
  // bill test
  return (
    <BrowserRouter>
      <NavBar />
      {/* <Switch> */}
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/" exact={false}>
          <MainApp />
        </ProtectedRoute>
        <ProtectedRoute path="/@me/:serverId" exact={true}>
          <ChannelsList />
        </ProtectedRoute>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/messages/:channelId">
          <MessageMain />
        </Route>
      {/* </Switch> */}
    </BrowserRouter>
  );
}

export default App;
