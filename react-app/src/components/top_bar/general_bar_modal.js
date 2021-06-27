import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import {getRelationships} from "../../store/relationship"
import {createRelationship} from "../../store/relationship"
import {editRelationship} from "../../store/relationship"
import {getAllUsers} from "../../store/user"

import "../css/general_bar.css"
function GeneralBarModal() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [target, setTarget] = useState(false);
    const [blockid, setBlockid] = useState(null);
    const [pendingid, setPendingid] = useState(null);
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState([]);

    const relationshipObject= useSelector((state) => state.relationship.relationships);
    const user = useSelector(state => state.session.user)
    const allusers =  useSelector(state => state.user.users)
    const alluserList = Object.values(allusers)

    console.log(relationshipObject)
    console.log(alluserList)
    console.log(user)


    useEffect(() => {
        dispatch(getRelationships());
        dispatch(getAllUsers())
      }, [dispatch , username]);

/////////////////////////////////////////////////
    const Accepted = Object.values(relationshipObject).filter((el)=>(el.first_user_id === Number(user.id) && el.relationship ==="Accepted"))
    const Blocked = Object.values(relationshipObject).filter((el)=>(el.first_user_id === Number(user.id) && el.relationship ==="Blocked" ))
    const Pending = Object.values(relationshipObject).filter((el)=>(el.first_user_id === Number(user.id) && el.relationship ==="Pending" ))

    console.log(Accepted)
    console.log(Blocked)
    console.log(Pending)

    const Acceptedpushlist =[]
    for (let i=0; i < Accepted.length; i++){
        for (let j=0; j<alluserList.length; j++){
            if( Accepted[i].second_user_id===alluserList[j].id){
                Acceptedpushlist.push(alluserList[j].username)
            }
        }
    }
    const Blockedpushlist =[]
    for (let i=0; i < Blocked.length; i++){
        for (let j=0; j<alluserList.length; j++){
            if( Blocked[i].second_user_id===alluserList[j].id){
                Blockedpushlist.push([alluserList[j].username,alluserList[j].id])
            }
        }
    }
    const Pendingpushlist =[]
    for (let i=0; i < Pending.length; i++){
        for (let j=0; j<alluserList.length; j++){
            if( Pending[i].second_user_id===alluserList[j].id){
                Pendingpushlist.push([alluserList[j].username, alluserList[j].id])
            }
        }
    }
///////////////////////////////////////////////////
    console.log(Acceptedpushlist)
    console.log(Blockedpushlist)
    console.log(Pendingpushlist)

    const targetModalvalue = (e) => {
        setTarget(e.target.innerText)
        setShowModal(true)
    }

    const onPendingSubmit = (e) => {
        setPendingid(e.target.value)
        if(pendingid) dispatch(editRelationship(pendingid, "Pending"));
    }

    const onBlockedSubmit = (e) => {
        setBlockid(e.target.value)
        dispatch(editRelationship(blockid, "Blocked"));
    }

    const onFriendSubmit = async (e)=> {
        if(username.includes("#")){
            let secondUserId = username.split("#")
            console.log(secondUserId[1])
            dispatch(createRelationship(secondUserId[1],"Pending"));
        }
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
        if(!username.includes("#")){
            setErrors(["Please Add UserId"])
        } else{
            setErrors([""])
        }
    }

    return (
    <div className="Topbar_Buttons">
        <div>
            <a className="General_Button" onClick={targetModalvalue} value="All">All</a>
            {showModal && target==="All" && (
            <Modal onClose={() => setShowModal(false)}>
                <div className="General_Modal scroll">
                    <h3 className="modaltitle">All Friends</h3>
                    {Acceptedpushlist.map((el,i)=>(
                        <div key={i}>{el}</div>))}
                </div>
            </Modal>)}
        </div>
        <div>
            <a className="General_Button" onClick={targetModalvalue}>Pending</a>
            {showModal  && target==="Pending" &&(
            <Modal onClose={() => setShowModal(false)}>
                <div className="General_Modal scroll">
                    <h3 className="modaltitle">Pending Requests</h3>
                    {Pendingpushlist.map((el,i)=>(
                    <div key={i}>
                        <button onClick={onPendingSubmit} value={el[1]}> Accept Request </button>
                        <div>{el[0]}---{el[1]}</div>
                    </div>
                    ))}
                </div>
            </Modal>)}
        </div>
        <div>
            <a className="General_Button" onClick={targetModalvalue}>Blocked</a>
            {showModal && target==="Blocked" &&(
            <Modal onClose={() => setShowModal(false)}>
                <div className="General_Modal scroll">
                    <h3 className="modaltitle">Blocked Users</h3>
                    {Blockedpushlist.map((el,i)=>(
                        <div key={i}>
                            <button onClick={onBlockedSubmit} value={el[1]}> Unblock </button>
                            <div >{el[0]}---{el[1]}</div>
                        </div>
                    ))}
                </div>
            </Modal>)}
        </div>
        <div>
            <button className="General_Button" onClick={targetModalvalue}>Add Friend</button>
            {showModal && target==="Add Friend" &&(
            <Modal onClose={() => setShowModal(false)}>
                <div className="General_Modal ">
                    <h3 className="modaltitle">Add Friend</h3>
                    <form onSubmit={onFriendSubmit} className='friend_add_form'>
                        <div>
                        {errors.map((error) => (
                            <div>{error}</div>
                        ))}
                        </div>
                        <div className='friend_div'>
                        <label htmlFor="name">Add UserName#Id</label>
                        <input
                            name="UserName"
                            type="text"
                            placeholder="Username#Id"
                            value={username}
                            onChange={updateUsername}
                            className='friend_input'
                        />
                        </div>

                        <div className="create">
                        <button className="friend-button" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </Modal>)}
        </div>
    </div>
  );
}

export default GeneralBarModal;
