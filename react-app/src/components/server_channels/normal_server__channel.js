import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import * as messageActions from "../../store/message";
import * as channelActions from "../../store/channel";
import { Modal } from "../../context/Modal";

function NormalChannel({ channel }) {
  const channelRef = useRef();
  const { serverId, channelId } = useParams();
  const dispatch = useDispatch();
  const [activeDiv, setActiveDiv] = useState("");
  const [editChannel, setEditChannel] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [channelDeleted, setChannelDeleted] = useState(false)
  useEffect(() => {
    dispatch(messageActions.getMessages(channel.id));
  }, [serverId]);

  function EditChannel({ props }) {
    const { serverId } = useParams();
    const { channelId } = props;
    const channelLink = document.getElementById(`channel_${channelId}`);

    const currServer = useSelector((state) => state.channel.channels[serverId]);
    const currChannel = currServer[channelId];
    const [channelName, setChannelName] = useState(currChannel.name);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
      e.preventDefault();
      let newErrors = [];
      dispatch(channelActions.editChannel({ id: channelId, name: channelName }))
        .then(() => {
          channelRef.current.innerText = `# ${channelName}`;
          setChannelName("");
          setEditChannel(!editChannel);
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            newErrors = data.errors;
            setErrors(newErrors);
          }
        });
      history.push(`/@me/${serverId}/${channelId}`);
    };

    return (
      <div>
        {errors.length > 0 &&
          errors.map((error) => <div key={error}>{error}</div>)}
        <h2>Edit Channel Name</h2>
        <form
          style={{ display: "flex", flexFlow: "column" }}
          onSubmit={handleSubmit}
        >
          <label>
            <input
              type="text"
              placeholder="Channel Name"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
          </label>
          <button type="submit">Set Channel Name</button>
        </form>
      </div>
    );
  }

  const deleteChannel = (e, channelId) => {
    e.preventDefault()
    dispatch(channelActions.deleteChannel(channelId, serverId))
    .then(()=>setChannelDeleted(!channelDeleted))
  }

  // document.querySelector('.channels__list').closest('.server_sidebar__link').classList.add('active')
  return (
    <>
      <div className="channel_list_item__div">
        <NavLink
          className="channel_list__link"
          exact
          to={`/@me/${channel.server_id}/${channel.id}`}
          activeClassName="active_channel"
        >
          <div className={`normal_channel__div ${activeDiv}`}>
            <p className="channel_info__p" ref={channelRef}>
              # {channel.name}
              <span className="channel_icons__span">
                <i
                  class="far fa-edit channel__icon"
                  onClick={() => setEditChannel(!editChannel)}
                ></i>
                <i class="far fa-trash-alt channel__icon"
                onClick={()=> setShowModal(!showModal)}></i>
              </span>
            </p>
          </div>
        </NavLink>
      </div>
      {editChannel && <EditChannel props={{ channelId: channel.id }} />}
      {showModal && (
        <Modal onClose={()=> setShowModal(false)}>
          Are you sure you want to delete this channel? This action is permanent and destroys all messages that have been sent to this channel.
          <button onClick={()=>setShowModal(false)}>No, I'm not sure</button>
          <button onClick={(e)=>deleteChannel(e, channel.id)}>Yes, I'm sure</button>
        </Modal>
      )}
    </>
  );
}

export default NormalChannel;
