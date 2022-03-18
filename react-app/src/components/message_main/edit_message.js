
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import * as messageActions from '../../store/message'

function EditMessage({ props }) {
  const { serverId, channelId } = useParams();
  const { currMessage, closeEdit } = props
  console.log('What are the key value pairs for currMessage?', currMessage)
  const messages = useSelector(state => state.message.messages[currMessage.channel_id]);
  console.log('Am I keying into these messages correctly?', messages)
  let targetMessage;
  if (messages) {
    messages.forEach((el) => {
      if (el.id === currMessage.id) {
        targetMessage = el;
      }
    })
  }

  const [showEditForm, setShowEditForm] = useState(true);
  console.log('Am I doing this right?', currMessage);

  const [message, setMessage] = useState(currMessage.content);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = [];
    console.log('Am I doing this right?', targetMessage);
    dispatch(messageActions.editMessage({ id: targetMessage.id, user_id: targetMessage.user_id, content: message, channel_id: targetMessage.channel_id }))
      .then((data) => {

        console.log('what will I find here?', data)
        setMessage("");
        closeEdit(false)


      }).catch((res) => {
        //
        if (res && res.errors) {
          newErrors = res.errors;
          setErrors(newErrors);
        }
      });

  };
  const preEdit =
    (
      <div className="message_content__div">
        {errors.length > 0 &&
          errors.map((error) => <div key={error}>{error}</div>)}
        <h2>edit</h2>
        <form
          // style={{ display: "flex", flexFlow: "column" }}
          onSubmit={handleSubmit}
          className="chat_box"
        >
          <label>
            <input
              type="text"
              placeholder="Edit Message"
              // className="text__box"
              style={{ width: '100%' }}
              defaultValue={`${currMessage.content}`}
              value={message.content}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          {/* <button type="submit">Submit Edit</button> */}
        </form>
      </div>
    );

  const postEdit = '';

  return (
    <div className="message_content__div">
      {errors.length > 0 &&
        errors.map((error) => <div key={error}>{error}</div>)}
      <h2>edit</h2>
      <form
        style={{ width: '100%' }}
        onSubmit={handleSubmit}
        className="chat_box"
      >
        <input
          type="text"
          placeholder="Edit Message"
          className="text__box"
          style={{ width: '100%' }}
          defaultValue={`${currMessage.content}`}
          value={message.content}
          onChange={(e) => setMessage(e.target.value)}
        />
        {/* <button type="submit">Submit Edit</button> */}
      </form>
    </div>
  );
}

export default EditMessage;
