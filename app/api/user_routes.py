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
    print(request)
    if "image" not in request.files:
        print('NOPENOPENOPE')
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        print("CLOSE BUT NO CIGARRRR")
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)
    
    print("imggggg", image.filename)

    upload = upload_file_to_s3(image)
    print("uppplllooaddd", upload)

    if "url" not in upload:
        print("WHY HERE?")
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    print('THIS IS THE URL WE ARE GETTING', url)
    # flask_login allows us to get the current user from the request
    updated_user = db.session.query(User).get(current_user.get_id())
    updated_user.avatar_link = url
    db.session.add(updated_user)
    db.session.commit()
    return {"url": url}
#     user_id = int(current_user.id)
#     res = request.get_json()
#     user = db.session.query(User).get(user_id)
#     if(res['password'] != res['repeatPassword']):
#         return {errors:["Password Does Not Match"]}
#     else:
#         if(user.username != res['username']):
#             user.username = res['username']
#         elif(user.email != res['email']):
#             user.email = res['email']
#         elif(user.avatar_link != res['image']):
#             user.avatar_link = res['image']
#         elif(user.hashed_password!= res['password']):
#             user.hashed_password = res['password']
#         db.session.add(user)
#         db.session.commit()
#         return user.to_safe_dict()

@user_routes.route('/<int:id>', methods=['DELETE'])
def delete_user(id):
    user_id = int(current_user.id)
    user= db.session.query(User).get( user_id)
    db.session.delete(user)
    db.session.commit()
    return {}


