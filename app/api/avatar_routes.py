from flask import Blueprint, request
from app.models import db, User
from flask_login import current_user, login_required
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

avatar_routes = Blueprint("avatar", __name__)


@avatar_routes.route("", methods=["POST"])
@login_required
def upload_image():
    if "avatar_link" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["avatar_link"]

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
    print('THIS IS THE URL WE ARE GETTING', url)
    # flask_login allows us to get the current user from the request
    updated_user = db.session.query(User).get(current_user.get_id())
    updated_user.avatar_link = url
    db.session.add(updated_user)
    db.session.commit()
    return {"url": url}
