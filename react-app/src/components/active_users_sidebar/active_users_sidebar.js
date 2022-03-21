import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getServerUsers } from "../../store/serveruser";
import { useParams } from "react-router-dom";
import defaultLogo from "../../images/default.png"
import Container from '../active_users_sidebar/userList_context_container';

import "../css/active_users_sidebar.css"

const ServerUsers = () => {
  const dispatch = useDispatch();
  const serverUsers = useSelector((state) => state.serveruser);
  let { serverId } = useParams();

  const serverUsersList = Object.values(serverUsers)
  let list = null

  useEffect(() => {
    dispatch(getServerUsers(serverId));
  }, [dispatch, serverId]);



  if (serverUsersList.length > 0) {
    list = serverUsersList.map((user) => {
      return (
        <Container user={user}>
          <UserList key={`userlist_key__${user.id}`} props={user} />
        </Container>
      )
    })
  }

  return (
    <div className="user_list">
      <h3>Members:</h3>
      {list}
    </div>
  );
}

const UserList = ({ props }) => {
  // console.log("WHAT ARE YOU",{props})
  return (

    <div className="server_users">
      <img
        className="user_image user_image_bar"
        alt='user-avatar'
        src={
          props.avatar_link
            ? props.avatar_link
            : defaultLogo
        }
      ></img>
      <div className="server_username">{props.username}</div>

    </div>

  )
}

export default ServerUsers
