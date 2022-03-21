from flask import Blueprint, jsonify, request
from app.models import db, Server, User, Channel, Message, ServerUser, Relationship
from flask_login import current_user, login_required

channel_routes = Blueprint('channels', __name__)


@channel_routes.route('/', methods=['POST'])
def create_channel():
    res = request.get_json()
    channel = Channel(name=res["name"],
                      server_id=res["server_id"])
    db.session.add(channel)
    db.session.commit()
    return channel.to_dict()


@channel_routes.route('/<int:id>', methods=['GET'])
def get_server_channels(id):
    channels = db.session.query(Channel).filter(Channel.server_id == id)
    return {"channels": [channel.to_dict() for channel in channels]}

@channel_routes.route('/<int:id>', methods=['DELETE'])
def delete_channel(id):
    channel = db.session.query(Channel).get(id)
    db.session.delete(channel)
    db.session.commit()
    return "deleted"


@channel_routes.route('/<int:id>/edit', methods=['POST'])
def edit_channel(id):
    res = request.get_json()
    # print('HELLO IS ANYONE HOME', res)
    channel = db.session.query(Channel).get(id)
    channel.name = res["name"]
    db.session.commit()
    # print('THIS IS CHANNEL.TO_DICT =======>', channel.to_dict())
    return channel.to_dict()
