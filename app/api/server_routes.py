from flask import Blueprint, jsonify, request
from app.models import db, Server, User, Channel, Message, ServerUser, Relationship
from flask_login import current_user, login_required

server_routes = Blueprint('servers', __name__)

@server_routes.route('/')
def getting_servers():
    user_id = int(current_user.id)
    user = User.query.get(user_id)
    return {'servers': user.get_servers()}


@server_routes.route('/', methods=['POST'])
def create_server():
    # get the server name from the form
    name = request.json['name']
    image = request.json['image']
    # create the server object
    server = Server(
        name=name,
        user_id=int(current_user.id),
        type='Public'
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

@server_routes.route('/<int:server_id>', methods=['PUT'])
def edit_server(server_id):
    # this will return the Name of Server for Updating
    res = request.get_json()
    # get Server by ServerId
    server = db.session.query(Server).get(server_id)
    # changed name
    server.name = res['name']
    # add back in
    db.session.add(server)
    db.session.commit()
    return{}
    # if server.owner_id != user_id:
    #     return {'errors': 'USER IS NOT SERVER OWNER'}, 401



@server_routes.route('/<int:server_id>', methods=['DELETE'])
def delete_server(server_id):
    user_id = int(current_user.id)
    server = Server.query.get(server_id)
    db.session.delete(server)
    db.session.commit()
    return {}

@server_routes.route('/serversuser/<int:serverId>')
@login_required
def server_get_users(serverId):
    usersObj = db.session.query(ServerUser, User).join(User).filter(ServerUser.server_id == serverId).all()
    # usersObj is getting (SeverUser,User) then I'm getting only the Users
    users = [y.to_dict() for x,y in usersObj ]
    return {"users": users}

@server_routes.route('/serversuser/<int:serverId>', methods=['POST'])
def add_server_users(serverId):
    name = request.json['name']

    userId = int(current_user.id)
    # serverId = db.session.query(ServerUser).get(serverId)
    if ("#" in name) :
        splitusername = name.split("#");
        username = splitusername[0]
        usernameid = splitusername[1]
        userNameCheck = db.session.query(db.session.query(User).filter(User.username == username, User.id == usernameid).exists()).scalar()
    else:
        return {'errors':["Please Add # UserId"]}
    if( userNameCheck ) :
        server_user = ServerUser(
            server_id=int(serverId),
            user_id=int(usernameid)
        )
        db.session.add(server_user)
        db.session.commit()
        return {'servers':[server_user.id]}
    else:
        return{'errors':["Not A Valid User"]}
    
# @server_routes.route('/user')
# @login_required
# def self_servers():
#     user_id = int(current_user.id)
#     user = User.query.get(user_id)
#     return {'servers': user.get_servers()}

    #send back the server and channel to update state maybe
