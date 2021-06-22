import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUsersForSidebar} from '../../store/serveruser'
// import styles from './MembersList.module.css'

function MembersList() {
    const dispatch = useDispatch()
    const { serverId } = useParams();
    
    const members = useSelector(state => state.serveruser.serveruser)
    console.log(members)
    const [membersArr, setMembersArr] = useState([])
    useEffect(() => {
        let tempMembersArr = []
        for (let member in members) {
            tempMembersArr.push(members[member])
        }
        setMembersArr(tempMembersArr)
    }, [members])
    useEffect(() => {
        dispatch(getUsersForSidebar(serverId))
        let tempMembersArr = []
        for (let member in members) {
            tempMembersArr.push(members[member])
        }
        setMembersArr(tempMembersArr);
    }, [serverId]) // If you put members in here it will be hell on earth
    return (
        <div>
            <h1>Members:</h1>
            <div>{membersArr.map(member => (
                <div key={member.id}>{member.name}</div>
            ))}</div>
        </div>
    )
}
export default MembersList
