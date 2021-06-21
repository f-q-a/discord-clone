from flask import Blueprint, jsonify, request
from app.models import db, Server, User, Channel, Message, ServerUser, Relationship
from flask_login import current_user, login_required

relationship_routes = Blueprint('relationships', __name__)


@relationship_routes.route('/')
def get_relationships ():
    userId= int(current_user.id)
    UserRelationship = Relationship.query.filter(Relationship.first_user_id==userId).all()
    relationships = [relationship.to_dict() for relationship in UserRelationship]
    return {'relationships': relationships}
