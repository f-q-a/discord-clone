from flask import Blueprint, jsonify, request
from app.models import db, Server, User, Channel, Message, ServerUser, Relationship
from flask_login import current_user, login_required

server_routes = Blueprint('servers', __name__)
#api/servers/

@server_routes.route('/')
@login_required
def getting_servers():
    # getting userId from the flask login
    userId = current_user.id
    # query the joins table for all of the user's servers
    Users_Server = ServerUser.query.filter(ServerUser.user_id == userId).all()
    # list of servers by id
    serverIds = [server.server_id for server in Users_Server]
    # with the list of ids get me the acutal Servers as Objects
    serverObjects = Server.query.filter(Server.id.in_(serverIds)).all()
    # those servers in list should
    servers = [servers.to_dict() for servers in serverObjects]
    return {'servers':servers}

@server_routes.route('/', methods=['POST'])
@login_required
def create_server():
    # get the server name from the form
    name = request.json['name']

    # create the server object
    server = Server(
        name=server_name,
        user_id=int(current_user.id),
        type='public'
        )
    db.session.add(server)
    db.session.commit()

    # add the serveruser object
    ServerUser = ServerUser(
        server_id=int(server.id),
        user_id=int(current_user.id)
    )
    db.session.add(ServerUser)
    db.session.commit()

    # add #General/Default channel
    channel = Channel(
        name='General',
        server_id=server.id
    )
    db.session.add(channel)
    db.session.commit()

    server_dict = server.to_dict()
    channel_dict = channel.to_dict()
    #send back the server and channel to update state maybe
    return {'server': server_dict, 'channel': channel_dict}
