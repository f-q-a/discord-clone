import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NormalChannel from "./normal_server__channel";
// import * as messageActions from "../../store/message";
import { useParams, useHistory } from "react-router-dom";
import * as channelActions from '../../store/channel';
import { Route } from "react-router-dom";
import MessageMain from "../message_main/message_main";
import GeneralBar from "../top_bar/general_bar";

function ChannelsList() {
  const { serverId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const server = useSelector(state => state.server[serverId])
  // let user = useSelector(state => state.session.user)
  let channelsState = useSelector((state) => state.channel);
  const [createChannelState, setCreateChannelState] = useState(false)
  // const [channelCreated, setChannelCreated] = useState(false)
  // const [channelDeleted, setChannelDeleted] = useState(false)
  const [channelisloaded, setChannelisloaded,] = useState(false)

  const channelsList = Object.values(channelsState)

  useEffect(() => {
    const lastChannel = localStorage.getItem(serverId)
    if (lastChannel) history.push(`/channels/${serverId}/${lastChannel}`)
  }, [serverId, history])

  useEffect(() => {
    dispatch(channelActions.getChannels(serverId)).then(() => setChannelisloaded(true))
    return () => {
      dispatch(channelActions.clearChannelsActions())
    }
  }, [serverId, dispatch])



  // const deleteChannel = (e, channelId) => {
  //   e.preventDefault()
  //   dispatch(channelActions.deleteChannel(channelId, serverId))
  //     .then(() => setChannelDeleted(!channelDeleted))
  // }

  const el = document.querySelector("body")
  el.addEventListener('contextmenu', function (ev) {
    ev.preventDefault();
    return false;
  }, false);

  // const rerenderRef = useRef()

  // if ((window.location.href.endsWith(`/@me/${serverId}/`) || window.location.href.endsWith(`/@me/${serverId}`)) && channelsList) history.push(`/@me/${serverId}/${channelsList[0].id}`)

  function CreateChannel({ endChannelCreate }) {

    const { serverId } = useParams();
    // const currServer = useSelector(state => state.server[serverId]);
    const [channelName, setChannelName] = useState("");
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    // const history = useHistory();
    const handleSubmit = (e) => {
      e.preventDefault();
      let newErrors = [];
      dispatch(channelActions.createChannel({ name: channelName, server_id: serverId }))
        .then(() => {
          endChannelCreate()
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
    if (!channelisloaded) return null;
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
  function endChannelCreate() {
    setCreateChannelState(false)
  }

  return (
    <>
      <div className="channels__list">
        <div className="server_title--channel_list__div">{server && `${server.name}`}</div>
        {/* {(user && user.id === server.user_id) ? (channelsList && */}
        <div className="text_channels channel_list__div">
          <p className="text_channels_paragraph">Text Channels</p>
          <span className="add_text_channel_paragraph" onClick={() => setCreateChannelState(!createChannelState)}>{createChannelState ? "Cancel" : "Add Channel"}</span>
          {createChannelState && <CreateChannel endChannelCreate={endChannelCreate} />}
          {channelsList &&
            channelsList.map((channel, index) => (
              <div className="text_channels individual_text_channel">
                <NormalChannel channel={channel} key={`channel_key__${channel.id}`} />
              </div>
            ))}
        </div>
      </div>
      <Route path='/channels/:serverId/:channelId' exact={false}>
        <MessageMain />
        <GeneralBar />
      </Route>
    </>
  )
}





export default ChannelsList;
