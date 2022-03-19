from turtle import update
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, Server, User, Channel, Message, ServerUser, Relationship
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_safe_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_safe_dict()

@user_routes.route('/<int:id>', methods=['PUT'])
def edit_user(id):
    '''
    Edit user route
    '''
    data = request.form.to_dict(flat=True)
    print('here be data', data)
    updated_user = db.session.query(User).get(current_user.get_id())
    if "image" in request.files:

        image = request.files["image"]

        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400

        url = upload["url"]
        # flask_login allows us to get the current user from the request
        updated_user.avatar_link = url
    # naive error handling
    if data["email"] != "":
        updated_user.email = data["email"]
    if data["username"] != "":
        updated_user.username = data["username"]
        
    db.session.add(updated_user)
    db.session.commit()
    return {"user": updated_user.to_safe_dict()}

@user_routes.route('/<int:id>', methods=['DELETE'])
def delete_user(id):
    user_id = int(current_user.id)
    user= db.session.query(User).get( user_id)
    db.session.delete(user)
    db.session.commit()
    return {}


