from flask import Blueprint, jsonify, request
from app.models import db, Server, User, Channel, Message, ServerUser, Relationship
from flask_login import current_user, login_required
from sqlalchemy import or_, and_


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
    print ("WHAT THE FUCK________", res)
    if(res["relationshipType"]=="Blocked"):
         userRelations = db.session.query(Relationship).filter((Relationship.first_user_id==userId, Relationship.second_user_id==res['secondUserId'])).one()
         userRelations.relationship = "None"# None/Accepted/Blocked/Pending
         db.session.add(userRelations)
         db.session.commit()


    elif(res["relationshipType"]=="Pending"):
        userRelations1 = db.session.query(Relationship).filter((Relationship.first_user_id==userId, Relationship.second_user_id==res['secondUserId'])).one()
        userRelations1.relationship = "Accept"# None/Accepted/Blocked/Pending
        userRelations2 = db.session.query(Relationship).filter((Relationship.first_user_id==res['secondUserId'], Relationship.second_user_id==userId)).one()
        userRelations2.relationship = "Accept"# None/Accepted/Blocked/Pending
        db.session.add(userRelations1)
        db.session.add(userRelations2)
        db.session.commit()


    UserRelationship = Relationship.query.filter(Relationship.first_user_id==userId).all()
    relationships = [relationship.to_dict() for relationship in UserRelationship]
    return {'relationships': relationships}

@relationship_routes.route('/', methods=['DELETE'])
def delete_relationships ():
    userId= int(current_user.id)
    res = request.get_json()
    relation = Relationship.query(Relationship).get((userId,res["second_user_id"]))
    db.session.delete(relation)
    db.session.commit()
    return relation
