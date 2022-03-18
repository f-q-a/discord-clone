import os

from datetime import date, datetime 
from flask_socketio import SocketIO, emit, join_room, leave_room, send
from .models import db, Message

# create your SocketIO instance


if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://discoursediscordclone.herokuapp.com",
        "https://discoursediscordclone.herokuapp.com"
    ]
else:
    origins = "*"


socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on("chat")
def handle_chat(data):
 
    # """
    # msgArr = []
    # message = Message(user_id=sender_user_id,
    #                   content = data.msg
    #                   channel_id = data.channelId)
    # msgArr.append(message)
    # """
    # print('CHATCHATCHATCHAT', data)
    # room = data['channelId']
    # emit("chat", data, room=room)
    print('```data```', data)
    message = Message(**{
        'user_id': data['user_id'],
        'chat_id': data['chat_id'],
        'content': data['content'],
    })
    db.session.add(message)
    db.session.commit()
    print(message.to_dict())
    chat_data = {
        'username': data['username'],
        'content': data['content'],
        'created_at': str(datetime.now()),
        'user_id': data['user_id']
    }
    room = str(data['chat_id'])
    emit("chat", chat_data, room=room)

@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['channelId']
    join_room(room)
    print(username + ' has joined room ' + room)
    send(username + ' has entered the room.', to=room)
