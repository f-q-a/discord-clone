
import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import * as channelActions from '../../store/channel'

function CreateChannel({}) {

  const { serverId} = useParams();
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
        setChannelName("");
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          newErrors = data.errors;
          setErrors(newErrors);
        }
      });
    history.push(`/@me/${serverId}`)
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

export default CreateChannel;
