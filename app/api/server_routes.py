from flask import Blueprint, jsonify, request
from app.models import db, Server, User, Channel, Message, ServerUser, Relationship
from flask_login import current_user, login_required

server_routes = Blueprint('servers', __name__)

@server_routes.route('/')
@login_required
def getting_servers():
    # getting userId from the flask login
    userId = current_user.id
    # query the joins talble for all of the user's servers
    Users_Server = ServerUser.query.filter(ServerUser.user_id == userId).all()
    # list of servers by id
    serverIds = [server.server_id for server in Users_Server]
    # with the list of ids get me the acutal Servers as Objects
    serverObjects = Server.query.filter(Server.id.in_(serverIds)).all()
    # those servers in list should
    servers = [servers.to_dict() for servers in serverObjects]
    return {'servers':servers}
