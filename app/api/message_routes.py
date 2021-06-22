from flask import Blueprint, jsonify, request
from app.models import db, Server, User, Channel, Message, ServerUser, Relationship
from flask_login import current_user, login_required


message_routes = Blueprint('messages', __name__)

@message_routes.route('/<int:id>', methods=['GET'])
def get_messages(id):
    messages = db.session.query(Message).filter(Message.channel_id == id).all()
    result = [message.to_dict() for message in messages]
    print('HELLO?---->', result)
    return {'messages':result}

@message_routes.route('/', methods=['POST'])
def create_message():
    res = request.get_json()
    message = Message(user_id= current_user.id,
                      content= res["content"],
                      channel_id= res["channel_id"])
    db.session.add(message)
    db.session.commit()
    return message

@message_routes.route('/<int:id>', methods=['DELETE'])
def delete_message(id):
    message = db.session.query(Message).get(id)
    db.session.delete(message)
    db.session.commit()
    return 'Message deleted'

@message_routes.route('/<int:id>', methods=['PUT'])
def edit_message(id):
    res = request.get_json()
    message = db.session.query(Message).get(id)
    message.content = res['content']
    db.session.commit()
    return message
