import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getServerUsers } from "../../store/serveruser";
import { useParams } from "react-router-dom";
// import "./serverUsers.css";


const ServerUsers = () => {
  const dispatch = useDispatch();
  const serverUsers = useSelector((state) => state.serveruser);
  console.log("serverUser",serverUsers);
  let { serverId } = useParams();


  useEffect(async () => {
await dispatch(getServerUsers(serverId));
  }, [dispatch, serverId]);
console.log(Array.isArray(serverUsers))
let list=null
  if(serverUsers.length > 0){
    list = serverUsers.map((user) => {
        if(user){
           return <UserList props={user} />
        }
    })
}
console.log("THIS IS LIST________", list)
  return (
    <div>
        <h1>ServerUsers:</h1>
        {list}
    </div>
  );
  }

const UserList = ({props}) => {
    console.log(props)
    return(
    <div className="server_users">
        <div>
            <img
                className="user_image user_image_bar"
                src={
                props.avatar_link
                    ? props.avatar_link
                    : "default"
                }
            ></img>
        </div>
        <div className="server_username">{props.username}</div>
    </div>
    )
}

export default ServerUsers
