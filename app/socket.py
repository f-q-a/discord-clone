from flask_socketio import SocketIO, emit, join_room, leave_room, send
import os

# create your SocketIO instance


if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://actual-app-url.herokuapp.com",
        "https://actual-app-url.herokuapp.com"
    ]
else:
    origins = "*"


socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on("chat")
def handle_chat(data):

    """
    msgArr = []
    message = Message(user_id=sender_user_id,
                      content = data.msg
                      channel_id = data.channelId)
    msgArr.append(message)
    """
    
    print('SOCKETIO DATA HERE ------>', data)
    emit("chat", data, broadcast=True)

@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', to=room)
