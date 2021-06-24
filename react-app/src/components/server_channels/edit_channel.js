
// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
// import * as channelActions from '../../store/channel'

// function EditChannel() {
//   const { id, name } = useParams()
//   console.log('WHAT ARE THESE VALUES', id, name)
//   const currServer = useSelector(state => state.channel.channels[serverId]);
//   const currChannel = currServer[channelId];
//   const [channelName, setChannelName] = useState(currChannel.name);
//   const [errors, setErrors] = useState([]);
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let newErrors = [];
//     dispatch(channelActions.editChannel({ id, name }))
//       .then(() => {
//         setChannelName("");
//       })
//       .catch(async (res) => {
//         const data = await res.json();
//         if (data && data.errors) {
//           newErrors = data.errors;
//           setErrors(newErrors);
//         }
//       });
//   };

//   return (
//     <div>
//       {errors.length > 0 &&
//         errors.map((error) => <div key={error}>{error}</div>)}
//         <h2>Edit Channel Name</h2>
//       <form
//         style={{ display: "flex", flexFlow: "column" }}
//         onSubmit={handleSubmit}
//       >
//         <label>
//           <input
//             type="text"
//             placeholder="Channel Name"
//             value={channelName}
//             onChange={(e) => setChannelName(e.target.value)}
//           />
//         </label>
//         <button type="submit">Set Channel Name</button>
//       </form>
//     </div>
//   );
// }

// export default EditChannel;