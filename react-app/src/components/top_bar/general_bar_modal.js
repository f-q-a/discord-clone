import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import {getRelationships} from "../../store/relationship"
import {getAllUsers} from "../../store/user"
// import GeneralBarAll from '../top_bar/general_bar_all'
function GeneralBarModal({props}) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);//false
    const [target, setTarget] = useState(false);//false
    const relationshipObject= useSelector((state) => state.relationship.relationships);
    const user = useSelector(state => state.session.user)
    const allusers =  useSelector(state => state.user.users)
    const alluserList = Object.values(allusers)

    useEffect(() => {
        dispatch(getRelationships());
        dispatch(getAllUsers())
      }, [dispatch]);

    console.log(relationshipObject)

    const Accepted = Object.values(relationshipObject).filter((el)=>(el.first_user_id === Number(user.id) && el.relationship ==="Accept" ))
    const Blocked = Object.values(relationshipObject).filter((el)=>(el.first_user_id === Number(user.id) && el.relationship ==="Blocked"   ))
    const Pending = Object.values(relationshipObject).filter((el)=>(el.first_user_id === Number(user.id) && el.relationship ==="Pending"   ))

    const AcceptedUserId = Accepted.map((el)=>el.second_user_id)
    const BlockedUserId = Blocked.map((el)=>el.second_user_id)
    const PendingUserId = Pending.map((el)=>el.second_user_id)


    const Acceptedpushlist =[]
    for (let i=0; i < AcceptedUserId.length; i++){
        for (let j=0; j<alluserList.length; j++){
            if( AcceptedUserId[i]===alluserList[j].id){
                Acceptedpushlist.push(alluserList[j].username)
            }
        }

    }

    const Blockedpushlist =[]
    for (let i=0; i < BlockedUserId.length; i++){
        for (let j=0; j<alluserList.length; j++){
            if( BlockedUserId[i]===alluserList[j].id){
                Blockedpushlist.push(alluserList[j].username)
            }
        }

    }

    const Pendingpushlist =[]
    for (let i=0; i < PendingUserId.length; i++){
        for (let j=0; j<alluserList.length; j++){
            if( PendingUserId[i]===alluserList[j].id){
                Pendingpushlist.push(alluserList[j].username)
            }
        }

    }


    const targetQ = (e) => {
        setTarget(e.target.innerText)
        console.log(e.target.value)
        setShowModal(true)
      }


    return (
    <div>
        <div>
            <a className="LoginButton" onClick={targetQ} value="All">All</a>
            {showModal && target==="All" && (
            <Modal onClose={() => setShowModal(false)}>
                {Acceptedpushlist.map((el,i)=>(<div key={i}>{el}</div>))}
            </Modal>)}
        </div>
        <div>
            <a className="LoginButton" onClick={targetQ}>Pending</a>
            {showModal  && target==="Pending" &&(
            <Modal onClose={() => setShowModal(false)}>
                 {Pendingpushlist.map((el,i)=>(<div key={i}>{el}</div>))}
            </Modal>)}
        </div>
        <div>
            <a className="LoginButton" onClick={targetQ}>Blocked</a>
            {showModal && target==="Blocked" &&(
            <Modal onClose={() => setShowModal(false)}>
                 {Blockedpushlist.map((el,i)=>(<div key={i}>{el}</div>))}
            </Modal>)}
        </div>
    </div>
  );
}

export default GeneralBarModal;
