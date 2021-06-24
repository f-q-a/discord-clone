
import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import * as channelActions from '../../store/channel'

function EditChannel() {
  const { serverId, channelId } = useParams()
  const currServer = useSelector(state => state.channel.channels[serverId]);
  const currChannel = currServer[channelId];
  const [channelName, setChannelName] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = [];
    dispatch(channelActions.editChannel({ channelId, channelName }))
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
            value={currChannel.name}
            onChange={(e) => setChannelName(e.target.value)}
          />
        </label>
      </form>
    </div>
  );
}

export default EditChannel;
