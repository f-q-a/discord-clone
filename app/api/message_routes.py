import datetime
from flask import Blueprint, jsonify, request
from app.models import db, Server, User, Channel, Message, ServerUser, Relationship
from flask_login import current_user, login_required



message_routes = Blueprint('messages', __name__)

@message_routes.route('/<int:id>', methods=['GET'])
def get_messages(id):
    messages = db.session.query(Message).filter(Message.channel_id == id).all()
    result = [message.to_dict() for message in messages]
    print("PPEEPPPEEEE", result)
    return {'messages':result}

@message_routes.route('/', methods=['POST'])
def create_message():
    res = request.get_json()
    message = Message(user_id= current_user.id,
                      content= res["content"],
                      channel_id= res["channelId"])
    db.session.add(message)
    db.session.commit()
    # print('This is a call to to_dict', message.to_dict())
    return message.to_dict()

@message_routes.route('/<int:id>', methods=['DELETE'])
def delete_message(id):
    message = db.session.query(Message).get(id)
    temp = message.to_dict()
    db.session.delete(message)
    db.session.commit()
    return temp

@message_routes.route('/<int:id>', methods=['PUT'])
def edit_message(id):
    res = request.get_json()
    message = Message.query.get(id)
    message.content = res['content']
    message.updated_at = db.func.now()
    db.session.add(message)
    db.session.commit()
    return message.to_dict()
