import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import {getRelationships} from "../../store/relationship"
import {editRelationship} from "../../store/relationship"
import {getAllUsers} from "../../store/user"
// import GeneralBarAll from '../top_bar/general_bar_all'
import "../css/general_bar.css"
function GeneralBarModal() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [target, setTarget] = useState(false);
    const [blockid, setBlockid] = useState(null);
    const [pendingid, setPendingid] = useState(null);
    console.log("FRONT______1",blockid)
    console.log("FRONT______2",pendingid)
    const relationshipObject= useSelector((state) => state.relationship.relationships);
    const user = useSelector(state => state.session.user)
    const allusers =  useSelector(state => state.user.users)
    const alluserList = Object.values(allusers)

    useEffect(() => {
        dispatch(getRelationships());
        dispatch(getAllUsers())
      }, [dispatch]);


    const Accepted = Object.values(relationshipObject).filter((el)=>(el.first_user_id === Number(user.id) && el.relationship ==="Accept" ))
    const Blocked = Object.values(relationshipObject).filter((el)=>(el.first_user_id === Number(user.id) && el.relationship ==="Blocked"   ))
    const Pending = Object.values(relationshipObject).filter((el)=>(el.first_user_id === Number(user.id) && el.relationship ==="Pending"   ))

    // const AcceptedUserId = Accepted.map((el)=>el.second_user_id)
    // const BlockedUserId = Blocked.map((el)=>el.second_user_id)
    // const PendingUserId = Pending.map((el)=>el.second_user_id)


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


    const targetQ = async (e) => {
        setTarget(e.target.innerText)
        setShowModal(true)
    }

    const onPendingSubmit = async (e) => {
        setPendingid(e.target.value)
        console.log("Why is this null Pending", pendingid)
        dispatch(editRelationship(pendingid, "Pending"));
    }

    const onBlockedSubmit = (e) => {
        setBlockid(e.target.value)
        console.log("Why is this null BLOCK",blockid)
        dispatch(editRelationship(blockid, "Blocked"));

    }


    return (
    <div>
        <div>
            <a className="General_Button" onClick={targetQ} value="All">All</a>
            {showModal && target==="All" && (
            <Modal onClose={() => setShowModal(false)}>
                <div className="General_Modal scroll">
                    <h3 className="modaltitle">All Friends</h3>
                    {Acceptedpushlist.map((el,i)=>(<div key={i} >{el}</div>))}
                </div>
            </Modal>)}
        </div>
        <div>
            <a className="General_Button" onClick={targetQ}>Pending</a>
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
            <a className="General_Button" onClick={targetQ}>Blocked</a>
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
    </div>
  );
}

export default GeneralBarModal;
