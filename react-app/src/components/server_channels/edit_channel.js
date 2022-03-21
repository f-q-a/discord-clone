
import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import * as channelActions from '../../store/channel'

function EditChannel() {
  const { channelId, serverId } = useParams()
  // const currServerChannels = useSelector(state => {
  //   const temp = state.channel.channels[serverId]
  //   return temp
  // });

  // console.log('Am I doing this right?', currServerChannels);

  const [channelName, setChannelName] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = [];
    return dispatch(channelActions.editChannel({id: channelId, name: channelName, server_id: serverId}))
      .then((data) => {

        // console.log('what will I find here?', data)
        setChannelName("");
        history.push(`/@me/${serverId}/${channelId}`)
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
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
        </label>
        <button type="submit">Set Channel Name</button>
      </form>
    </div>
  );
}

export default EditChannel;
