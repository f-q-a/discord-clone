from flask import Blueprint, jsonify, request
from app.models import db, Server, User, Channel, Message, ServerUser, Relationship
from flask_login import current_user, login_required
# from sqlalchemy import or_, and_


relationship_routes = Blueprint('relationships', __name__)

@relationship_routes.route('/')
def get_relationships ():
    userId= int(current_user.id)
    UserRelationship = Relationship.query.filter(Relationship.first_user_id==userId).all()
    relationships = [relationship.to_dict() for relationship in UserRelationship]
    return {'relationships': relationships}

@relationship_routes.route('/', methods=['POST'])
def create_relationships ():
    userId = int(current_user.id)
    res = request.get_json()
    relation = Relationship(
        first_user_id=userId,
        second_user_id=res["secondUserId"],
        relationship= res["relationshipType"]
    )
    db.session.add(relation)
    db.session.commit()
    return relation

@relationship_routes.route('/', methods=['PUT'])
def edit_relationships ():
    userId= int(current_user.id)
    res = request.get_json()
    # need to figure out why _and and how _or works
    userRelations = db.session.query(Relationship).filter(and_(Relationship.first_user_id==userId, Relationship.second_user_id==res["second_user_id"])).one()
    user_relation_dict = userRelations.to_dict()
    userRelations.relationship = res["relationship"]
    db.session.commit()
    return user_relation_dict

@relationship_routes.route('/', methods=['DELETE'])
def delete_relationships ():
    userId= int(current_user.id)
    res = request.get_json()
    relation = Relationship.query(Relationship).get((userId,res["second_user_id"]))
    db.session.delete(relation)
    db.session.commit()
    return relation
