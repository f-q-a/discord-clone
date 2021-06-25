from flask import Blueprint, jsonify, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, Server, User, Channel, Message, ServerUser, Relationship

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>', methods=['PUT'])
def edit_user(id):
    user_id = int(current_user.id)
    res = request.get_json()
    user = db.session.query(User).get(user_id)
    if(res['password'] != res['repeatPassword']):
        return {errors:["Password Does Not Match"]}
    else:
        if(user.username != res['username']):
            user.username = res['username']
        elif(user.email != res['email']):
            user.email = res['email']
        elif(user.avatar_link != res['image']):
            user.avatar_link = res['image']
        elif(user.hashed_password!= res['password']):
            user.hashed_password = res['password']
        db.session.add(user)
        db.session.commit()
        return user.to_dict()

@user_routes.route('/<int:id>', methods=['DELETE'])
def delete_user(id):
    user_id = int(current_user.id)
    user= db.session.query(User).get( user_id)
    db.session.delete(user)
    db.session.commit()
    return {}
