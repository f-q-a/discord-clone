import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getServerUsers } from "../../store/serveruser";
import { useParams } from "react-router-dom";
import defaultLogo from "../../images/default.png"

import "../css/active_users_sidebar.css"

const ServerUsers = () => {
  const dispatch = useDispatch();
  const serverUsers = useSelector((state) => state.serveruser);
  let { serverId } = useParams();

  const serverUsersList= Object.values(serverUsers)
  let list=null

  useEffect(async () => {
    await dispatch(getServerUsers(serverId));
  }, [dispatch, serverId]);



  if(serverUsersList.length > 0){
    list = serverUsersList.map((user) => {
           return <UserList key={`userlist_key__${user.id}`} props={user} />
    })
}
  return (
    <div className ="user_list">
        <h1>ServerUsers:</h1>
        {list}
    </div>
  );
  }

const UserList = ({props}) => {
    return(
    <div className="server_users">
        <div>
            <img
                className="user_image user_image_bar"
                src={
                props.avatar_link
                    ? props.avatar_link
                    : defaultLogo
                }
            ></img>
        </div>
        <div className="server_username">{props.username}</div>
    </div>
    )
}

export default ServerUsers
