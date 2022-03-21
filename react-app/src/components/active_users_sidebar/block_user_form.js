import React from "react";
import { useDispatch,  } from "react-redux";
// import {  useHistory } from "react-router-dom";
import { blockRelationship } from '../../store/relationship'

const BlockUserForm = ({user, setShowModal}) => {
  // const history = useHistory()
  const dispatch = useDispatch();
  // const [errors, setErrors] = useState([]);

  const onBlock = async (e) => {
    e.preventDefault();
    dispatch(blockRelationship(user.id,"Blocked"));
    setShowModal(prev => !prev)
    }

  return (
    <div className="General_Modal ">
        <h3 className="modaltitle">Are you sure you want to Block {user.username} ?</h3>
        <button className="block-button" onClick={onBlock}>Confirm</button>
    </div>
  )
}

export default BlockUserForm;
