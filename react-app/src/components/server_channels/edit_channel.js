
import React, { useState } from 'react';
import {useParams} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
// import './LoginFormModal.css';

  function EditChannel() {
  const { serverId, channelId } = useParams()

  const currServer = useSelector(state => state.channel.channels[serverId])
  const currChannel = currServer[channelId]

  console.log("AM I EVER REACHING THIS?", currChannel)
  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Channel Name</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
        </Modal>
      )}
    </>
  );
}

export default EditChannel;
