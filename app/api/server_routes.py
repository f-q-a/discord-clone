from flask import Blueprint, jsonify, request
from app.models import db, Server, User, Channel, Message, ServerUser, Relationship
from flask_login import current_user, login_required

server_routes = Blueprint('servers', __name__)
#api/servers/

@server_routes.route('/')
def getting_servers():
    userId = int(current_user.id)
    serverObjects = Server.query.filter(Server.user_id==userId).all()
    servers = [servers.to_dict() for servers in serverObjects]
    print('>>>',servers)
    return {'servers':servers}

@server_routes.route('/', methods=['POST'])
def create_server():
    # get the server name from the form
    name = request.json['name']

    # create the server object
    server = Server(
        name=name,
        user_id=int(current_user.id),
        type='public'
        )
    db.session.add(server)
    db.session.commit()

    # add the serveruser object
    server_user = ServerUser(
        server_id=int(server.id),
        user_id=int(current_user.id)
    )
    db.session.add(server_user)
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

# Will this Cascade Delete? or do I need to manually delete everything else?
@server_routes.route('/<int:server_id>', methods=['DELETE'])
def delete_server(server_id):
    user_id = int(current_user.id)
    server = Server.query.get(server_id)
    if server.owner_id != user_id:
        return {'errors': 'User is not server owner'}, 401

@server_routes.route('/serversuser')
@login_required
def get_serversuser():
    user_id = int(current_user.id)
    userServers = ServerUser.query.filter(ServerUser.user_id == user_id).all()
    serverIds = [userServer.server_id for userServer in userServers]
    raw_servers = Server.query.filter(Server.id.in_(serverIds)).all()
    servers = [server.to_dict() for server in raw_servers]
    print("this is backend_____",{'servers': servers})
    return {'servers': servers}
