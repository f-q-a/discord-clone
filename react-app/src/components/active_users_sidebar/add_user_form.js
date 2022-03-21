import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { deleteServer } from '../../store/server'
import {getRelationships} from "../../store/relationship"
import {addcreateRelationship} from "../../store/relationship"
// import {editRelationship} from "../../store/relationship"
import {getAllUsers} from "../../store/user"

const AddUserForm = ({user, setShowModal}) => {
// console.log("USER OBCJECT",{user})
  // const history = useHistory()
  const dispatch = useDispatch();
  // const [data, setData] = useState(false);

  // const relationshipObject= useSelector((state) => state.relationship.relationships);
  // const userstate = useSelector(state => state.session.user)
  // const allusers =  useSelector(state => state.user.users)
  // const alluserList = Object.values(allusers)

  // console.log(relationshipObject)
  // console.log(alluserList)
  // console.log(userstate)

  const onFriendSubmit = async (e)=> {
    dispatch(addcreateRelationship(user.id));
    setShowModal(prev => !prev)
    };

useEffect(() => {
    dispatch(getRelationships());
    dispatch(getAllUsers())
  }, [dispatch]); //username

  return (

        <div className="General_Modal ">
            <h3 className="modaltitle">Add {user.username} ?</h3>
            <button className="friend-button" onClick={onFriendSubmit}>Submit</button>
            {user.id}
        </div>

  )
}

export default AddUserForm;
