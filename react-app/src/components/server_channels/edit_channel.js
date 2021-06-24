
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import * as channelActions from '../../store/channel'

function EditChannel() {
  const { serverId, channelId } = useParams()
  const channelLink = document.getElementById(`channel_${channelId}`)
  console.log(`THIS IS CHANNELLINK`, channelLink)
  console.log('WHAT ARE THESE VALUES', serverId, channelId)
  const currServer = useSelector(state => state.channel.channels[serverId]);
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
        setChannelName("");

      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          newErrors = data.errors;
          setErrors(newErrors);
        }
      });
    history.push(`/@me/${serverId}/${channelId}`)
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
            onChange={e => setChannelName(e.target.value)}
          />
        </label>
        <button type="submit">Set Channel Name</button>
      </form>
    </div>
  );
}

export default EditChannel;
