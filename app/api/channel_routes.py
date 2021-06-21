from flask import Blueprint, jsonify, request
from app.models import db, Server, User, Channel, Message, ServerUser, Relationship
from flask_login import current_user, login_required

channel_routes = Blueprint('channels', __name__)

@channel_routes.route('/', methods=['POST'])
def create_channel():
    res = request.get_json()
    channel = Channel(id= res["id"],
                      name= res["name"],
                      server_id= res["server_id"])
    db.session.add(channel)
    db.session.commit()
    return channel

@channel_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_channel(id):
    channel = db.session.query(Channel).get(id)
    db.session.delete(channel)
    db.session.commit()
    return 'Channel deleted'

@channel_routes.route('/edit/<int:id>', methods=['POST'])
def edit_channel(id):
    res = request.get_json()
    channel = db.session.query(Channel).get(id)
    channel.name = res['name']
    db.session.commit()
    return channel
