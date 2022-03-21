import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import SplashPage from "./components/splash_page/splash_page";

import MainApp from "./components/app_container/main_app";

import { authenticate } from "./store/session";

import SettingBar from "./components/setting_bar/setting_bar"

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [url, setUrl] = useState(window.location.href);
  // console.log("WAHY!!!!!!!!!!!!!!!!!!!!!!!!!!!!",url)
  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  // const helper = (newUrl) =>{
  //   return setUrl(newUrl)
  // }

  // bill test <NavBar />
  return (
    <BrowserRouter>
      <Route path="/" exact={true}>
        <SplashPage setUrl={setUrl} />
      </Route>

      {url.endsWith("page") ? null : <div className="app__container">

        <ProtectedRoute path="/channels">
          <MainApp />
          <SettingBar />
        </ProtectedRoute>



      </div>}
    </BrowserRouter>
  );
}

export default App;
