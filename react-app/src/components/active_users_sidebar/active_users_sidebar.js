import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getServerUsers } from "../../store/serveruser";
import { useParams } from "react-router-dom";
import defaultLogo from "../../images/default.png"

const ServerUsers = () => {
  const dispatch = useDispatch();
  const serverUsers = useSelector((state) => state.serveruser);
  console.log("serverUser",serverUsers);
  let { serverId } = useParams();


const serverUsersList= Object.values(serverUsers)

  useEffect(async () => {
await dispatch(getServerUsers(serverId));
  }, [dispatch, serverId]);

console.log(serverUsersList)

let list=null
  if(serverUsersList.length > 0){
    list = serverUsersList.map((user) => {
           return <UserList key={user.id} props={user} />
    })
}
  return (
    <div>
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
