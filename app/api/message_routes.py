from flask import Blueprint, jsonify, request
from app.models import db, Server, User, Channel, Message, ServerUser, Relationship
from flask_login import current_user, login_required


message_routes = Blueprint('messages', __name__)

@message_routes.route('/', METHODS=['POST'])
def create_message():
    message = request.json()
    db.session.add(message)
    db.commit()

@message_routes.route('/<int:id>', METHODS=['POST'])
def delete_message(id):
    message = db.session.query(Message).get(id)
    db.session.delete(message)
    db.commit()

@message_routes.route('/<int:id>', METHODS=['POST'])
def edit_message(id):
    body = request.json['body']
    message = db.session.query(Message).get(id)
    message.content = body
    db.commit()

