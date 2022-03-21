
import React, { useState, useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';
import * as messageActions from '../../store/message'

function EditMessage({ props }) {
  // const { serverId, channelId } = useParams();
  const { message, closeEdit } = props
  const inputRef = useRef()
  // console.log('What are the key value pairs for message?', message)
  // const message = useSelector(state => state.message[message.id]);
  // console.log('Am I keying into these messages correctly?', message)
  

  // const [showEditForm, setShowEditForm] = useState(true);
  // console.log('Am I doing this right?', message);

  const [content, setContent] = useState(message.content);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  // const history = useHistory();

  useEffect(()=>{inputRef.current.focus()},[])

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = [];
    dispatch(messageActions.editMessage({ id: message.id, user_id: message.user_id, content: content, channel_id: message.channel_id }))
      .then(() => {

        // console.log('what will I find here?', data)
        setContent("");
        closeEdit(false)


      }).catch((res) => {
        //
        if (res && res.errors) {
          newErrors = res.errors;
          setErrors(newErrors);
        }
      });

  };

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
          ref={inputRef}
          type="text"
          placeholder="Edit Message"
          className="text__box"
          style={{ width: '100%' }}
          defaultValue={`${message.content}`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </form>
    </div>
  );
}

export default EditMessage;
