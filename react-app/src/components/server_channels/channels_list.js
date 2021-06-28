import React, { createFactory, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NormalChannel from "./normal_server__channel";
import * as messageActions from "../../store/message";
import { useParams, useHistory,Link } from "react-router-dom";
import * as channelActions from '../../store/channel';
import { Redirect } from "react-router";

function ChannelsList() {
  const { serverId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const server = useSelector(state => state.server.servers[serverId])
  let user = useSelector(state => state.session.user)
  let channelsState = useSelector((state) => state.channel.channels[serverId]);
  const [createChannelState, setCreateChannelState] = useState(false)
  const [channelCreated, setChannelCreated] = useState(false)
  const [channelDeleted, setChannelDeleted] = useState(false)
  const [channelisloaded, setChannelisloaded,] = useState(false)

  useEffect(()=>{

  },[])

  // console.log("WHAT IS CURRSERVER???", server)
  let channelIds = [];
  let channelsList

  if (channelsState) {
    // console.log('LOOK OVER HERE PAL ------> ', channelsList)
    channelsList = Object.values(channelsState);
    // console.log('LOOK OVER HERE AGAIN PAL ------> ', channelsList)
    // channelIds = channelsList.map(e => e.id
  }
  // const [messages, setMessages] = useState([])

  const deleteChannel = (e, channelId) => {
    e.preventDefault()
    dispatch(channelActions.deleteChannel(channelId, serverId))
    .then(()=>setChannelDeleted(!channelDeleted))
  }

  const el = document.querySelector("body")
  el.addEventListener('contextmenu', function(ev) {
    ev.preventDefault();
    return false;
 }, false);

 const rerenderRef = useRef()

  // // useEffect(() => {
  // //   for (let i = 0; i < channelIds.length; i++) {
  // //     console.log(channelIds[i].id);
  // //     dispatch(messageActions.getMessages(channelIds[i].id));

  //   }
  // }, [serverId, channelCreated, channelDeleted]);

  if((window.location.href.endsWith(`/@me/${serverId}/`) ||  window.location.href.endsWith(`/@me/${serverId}`)) && channelsList) history.push(`/@me/${serverId}/${channelsList[0].id}`)


  let newChannel
  if (server) {
    newChannel = <Link to={`/@me/${server.id}/add`} ref={rerenderRef}>Add New Channel</Link>
  }


  function CreateChannel() {

    const {serverId} = useParams();
    const currServer = useSelector(state => state.channel.channels[serverId]);
    const [channelName, setChannelName] = useState("");
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleSubmit = (e) => {
      e.preventDefault();
      let newErrors = [];
      dispatch(channelActions.createChannel({ name: channelName, server_id: serverId }))
        .then(() => {
          dispatch(channelActions.getChannels(serverId))
          setChannelName("");
          setChannelCreated(!channelCreated)
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            newErrors = data.errors;
            setErrors(newErrors);
          }
        });
      // setTimeout(()=>{setChannelCreated(!channelCreated)},500)
    };

    return (
      <div className='create_channel__div'>
        {errors.length > 0 &&
          errors.map((error, idx) => <div key={`error_key__${idx}`}>{error}</div>)}
        <h2>Create Channel</h2>
        <form
          style={{ display: "flex", flexFlow: "column" }}
          onSubmit={handleSubmit}
        >
          <label>
            <input
              type="text"
              placeholder="New Channel Name"
              value={channelName}
              onChange={e => setChannelName(e.target.value)}
            />
          </label>
          <button type="submit">Create Channel</button>
        </form>
      </div>
    );
  }

  return (
    <>
      <div className="channels__list">
        <div className ="server_title--channel_list__div">{server && `${server.name}`}</div>
        {/* {(user && user.id === server.user_id) ? (channelsList && */}
        {channelsList &&
          channelsList.map((channel, index) => (
            <>
              <NormalChannel channel={channel} key={`channel_key__${channel.id}`}/>
              <button key={`button_key__${channel.name}`} onClick={(e) => deleteChannel(e, channel.id)}>Delete Channel</button>
            </>
          ))}
        <button onClick={()=>setCreateChannelState(!createChannelState)}>New Channel?</button>
        {createChannelState && <CreateChannel props={{createChannelState, setCreateChannelState}}/>}
      </div>

    </>
  )
}





export default ChannelsList;
