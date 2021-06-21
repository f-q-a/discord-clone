from flask import Blueprint, jsonify, request
from app.models import db, Server, User, Channel, Message, ServerUser, Relationship
from flask_login import current_user, login_required


message_routes = Blueprint('messages', __name__)

@message_routes.route('/', methods=['POST'])
def create_message():
    res = request.get_json()
    message = Message(user_id= res["user_id"],
                      content= res["content"],
                      channel_id= res["channel_id"])
    db.session.add(message)
    db.session.commit()

@message_routes.route('/delete/<int:id>', methods=['POST'])
def delete_message(id):
    message = db.session.query(Message).get(id)
    db.session.delete(message)
    db.session.commit()

@message_routes.route('/edit/<int:id>', methods=['POST'])
def edit_message(id):
    res = request.get_json()
    message = db.session.query(Message).get(id)

    message.content = res['content']
    db.session.commit()
