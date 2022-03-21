
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import * as messageActions from '../../store/message'

let socket

const Chat = () => {
    const user = useSelector(state => state.session.user)

    const [messages, setMessages] = useState([])
    const [chatInput, setChatInput] = useState("")

    useEffect(() => {
        socket = io()

        socket.on('chat', (chat) => {
            setMessages(messages => [...messages, chat])
            console.log()
            messageActions.createMessage(chat)
        })

        return (() => {
            socket.disconnect()
        })
    }, [])

    const updateChatInput = (e) => {
        e.preventDefault()
        setChatInput(e.target.value)
    }

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit('chat', { user: user.username, msg: chatInput })
        // console.log('<<<<<<<', messages)
        setChatInput("")
    }


    return (user && (
        <div>
            <div>
                {messages.map((message, idx) => (<div key={idx}>
                    {`${message.user}: ${message.msg}`}</div>
                ))}
            </div>
            <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    )
    )
}

export default Chat
