
import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import * as messageActions from '../../store/message'

function EditMessage({props}) {
  const { currMessage } = props
  const messages = useSelector(state => state.message.messages[currMessage.id]);
  const [showEditForm, setShowEditForm] = useState(true);
  console.log('Am I doing this right?', currMessage);

  const [message, setMessage] = useState(currMessage.content);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = [];
    console.log('Am I doing this right?', messages);
    dispatch(messageActions.editMessage({id: currMessage.id, user_id: currMessage.user_id, content: message, channel_id: currMessage.channel_id}))
      .then((data) => {

        console.log('what will I find here?', data)
        setMessage("");


      })
      .catch((res) => {
        //
        if (res && res.errors) {
          newErrors = res.errors;
          setErrors(newErrors);
        }
      });
  };
  useEffect(() => {
    setMessage("")
    setShowEditForm(false)
  })
  const preEdit =
     (
      <div>
      {errors.length > 0 &&
        errors.map((error) => <div key={error}>{error}</div>)}
        <h2>edit</h2>
      <form
        style={{ display: "flex", flexFlow: "column" }}
        onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Edit Message"
            defaultValue={`${currMessage.content}`}
            value={message.content}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <button type="submit">Submit Edit</button>
      </form>
      </div>
     );

  const postEdit = '';

  return (
    <div>
    {
    (showEditForm === true) ?
    <div> {preEdit} </div> :
      <div> {postEdit} </div>
    }
    </div>
  );
}

export default EditMessage;
