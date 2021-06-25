import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import "../css/navigation.css"
const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button className="LogoutButton button" onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
