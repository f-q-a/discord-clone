from flask import Blueprint, jsonify, request
from app.models import db, Server, User, Channel, Message, ServerUser, Relationship
from flask_login import current_user, login_required
from sqlalchemy import or_, and_


relationship_routes = Blueprint('relationships', __name__)

@relationship_routes.route('/')
def get_relationships ():
    userId= int(current_user.id)
    UserRelationship = Relationship.query.all()
    relationships = [relationship.to_dict() for relationship in UserRelationship]
    return {'relationships': relationships}

@relationship_routes.route('/', methods=['POST'])
def create_relationships ():
    userId = int(current_user.id)
    res = request.get_json()
    userIdCheck = db.session.query(db.session.query(Relationship).filter((Relationship.second_user_id==res['secondUserId']) & (Relationship.first_user_id==userId) & (Relationship.relationship == "Pending")).exists()).scalar()
    if(userIdCheck) :
        relation = Relationship(
        first_user_id=res["secondUserId"],
        second_user_id=userId,
        relationship= res["relationshipType"] # Always be "Pending"
        )
        db.session.add(relation)
        db.session.commit()
        UserRelationship = Relationship.query.filter(Relationship.first_user_id==userId).all()
        relationships = [relationship.to_dict() for relationship in UserRelationship]
        return {'relationships': relationships}
    else :
        return {'errors':["Not A Valid User"]}

@relationship_routes.route('/edit', methods=['POST'])
def edit_relationships ():
    userId= int(current_user.id)
    res = request.get_json()
    userIdCheck = db.session.query(db.session.query(Relationship).filter((Relationship.first_user_id==userId) & (Relationship.second_user_id==res["secondUserId"]) & (Relationship.relationship != "Blocked")).exists()).scalar()
    PendingCheckRec = db.session.query(db.session.query(Relationship).filter((Relationship.first_user_id==userId) & (Relationship.second_user_id==res["secondUserId"]) & (Relationship.relationship == "Pending")).exists()).scalar()
    PendingCheckSen = db.session.query(db.session.query(Relationship).filter((Relationship.first_user_id==res["secondUserId"]) & (Relationship.second_user_id==userId) & (Relationship.relationship == "Pending")).exists()).scalar()
    if (PendingCheckRec and PendingCheckSen):
        userRelations1 = db.session.query(Relationship).filter((Relationship.first_user_id==res["secondUserId"]) & (Relationship.second_user_id==userId)).first()
        userRelations1.relationship = "Accepted"# None/Accepted/Blocked/PendinguserRelations1 = db.session.query(Relationship).filter((Relationship.first_user_id==res["secondUserId"]) & (Relationship.second_user_id==userId)).first()
        userRelations2 = db.session.query(Relationship).filter((Relationship.first_user_id==userId) & (Relationship.second_user_id==res["secondUserId"])).first()
        userRelations2.relationship = "Accepted"#
    elif (userIdCheck):
            userRelations1 = db.session.query(Relationship).filter((Relationship.first_user_id==res["secondUserId"]) & (Relationship.second_user_id==userId)).first()
            userRelations1.relationship = "Accepted"# None/Accepted/Blocked/Pending
    else:
        relation = Relationship(
        first_user_id=userId,
        second_user_id=res["secondUserId"],
        relationship= "Accepted"
        )
        db.session.add(relation)
    db.session.commit()
    UserRelationship = Relationship.query.all()
    relationships = [relationship.to_dict() for relationship in UserRelationship]
    return {'relationships': relationships}


@relationship_routes.route('/block', methods=['PATCH'])
def block_relationships ():
    userId= int(current_user.id)
    res = request.get_json()
    userIdCheck1 = db.session.query(db.session.query(Relationship).filter(((Relationship.first_user_id == userId) & (Relationship.second_user_id==res['secondUserId']))).exists()).scalar()
    userIdCheck2 = db.session.query(db.session.query(Relationship).filter(((Relationship.first_user_id ==res['secondUserId'] ) & (Relationship.second_user_id==userId))).exists()).scalar()
    # print(userIdCheck1)
    # print(userIdCheck2)
    checkerArray=[]
    if(userIdCheck1):
        rel1=db.session.query(Relationship).filter((Relationship.first_user_id == userId) & (Relationship.second_user_id == res['secondUserId'])).first()
        rel1.relationship = "Blocked"

    else:
        checkerArray.append([userId,res['secondUserId']])
    if(userIdCheck2):
        rel2=db.session.query(Relationship).filter((Relationship.first_user_id == res['secondUserId'] ) & (Relationship.second_user_id == userId)).first()
        rel2.relationship = "Blocked"

    else:
        checkerArray.append([res['secondUserId'],userId])
    # print(checkerArray)
    db.session.commit()
    UserRelationship = Relationship.query.all()
    relationships = [relationship.to_dict() for relationship in UserRelationship]
    return {'relationships': relationships, 'checkerArray': checkerArray }

@relationship_routes.route('/postblock', methods=['POST'])
def postblock_relationships ():

    userId= int(current_user.id)
    res = request.get_json()
    print( res )

    print("CheckerArray++++++++++++++++++++++++++++++++++",res)
    if(res[0]):
        relation1 = Relationship(
        first_user_id=res[0][0],
        second_user_id=res[0][1],
        relationship= "Blocked"
        )
        db.session.add(relation1)

    if(res[1]):
        relation2 = Relationship(
        first_user_id=res[1][0],
        second_user_id=res[1][1],
        relationship= "Blocked"
        )
        db.session.add(relation2)

    db.session.commit()
    UserRelationship = Relationship.query.all()
    relationships = [relationship.to_dict() for relationship in UserRelationship]
    return {'relationships': relationships}


@relationship_routes.route('/unblock', methods=['PATCH'])
def unblock_relationships ():
    userId= int(current_user.id)
    res = request.get_json()
    blockedID = res['blockid']
    rel1=db.session.query(Relationship).filter((Relationship.first_user_id == blockedID) & (Relationship.second_user_id == userId)).first()
    rel2=db.session.query(Relationship).filter((Relationship.first_user_id == userId ) & (Relationship.second_user_id == blockedID)).first()
    rel1.relationship = "None"
    rel2.relationship = "None"
    db.session.commit()
    UserRelationship = Relationship.query.all()
    relationships = [relationship.to_dict() for relationship in UserRelationship]
    return {'relationships': relationships}

@relationship_routes.route('/add', methods=['POST'])
def add_create_relationships ():
    userId = int(current_user.id)
    res = request.get_json()
    addID = res['addid']
    userIdCheck = db.session.query(db.session.query(Relationship).filter((Relationship.first_user_id==userId) & (Relationship.second_user_id==res['addid']) & (Relationship.relationship != "Blocked")).exists()).scalar()
    userIdCheck2 = db.session.query(db.session.query(Relationship).filter((Relationship.first_user_id==res['addid']) & (Relationship.second_user_id==userId) & (Relationship.relationship != "Blocked")).exists()).scalar()
    if(userIdCheck and userIdCheck2):
        return {'addId': res['addid']}
    else:
        relation = Relationship(
        first_user_id=userId,
        second_user_id=res['addid'],
        relationship= "Pending"
        )
        db.session.add(relation)
        db.session.commit()
        UserRelationship = Relationship.query.filter(Relationship.first_user_id==userId).all()
        relationships = [relationship.to_dict() for relationship in UserRelationship]
        return {'relationships': relationships}

@relationship_routes.route('/add', methods=['PATCH'])
def add_relationships ():
    userId= int(current_user.id)
    res = request.get_json()
    addID = res['addid']

    AcceptedTest=db.session.query(Relationship).filter((Relationship.first_user_id == addID) & (Relationship.relationship == "Accepted")).first()
    if(AcceptedTest):
        return {'errors': "Already Friended"}

    blockedTest=db.session.query(Relationship).filter((Relationship.first_user_id == addID) & (Relationship.relationship == "Blocked")).first()
    if(blockedTest):
         return {'errors': "User in Unavailable"}
    else:
        rel1=db.session.query(Relationship).filter((Relationship.first_user_id == addID) & (Relationship.second_user_id == userId)).first()
        rel1.relationship = "Pending"

        rel2=db.session.query(Relationship).filter((Relationship.first_user_id == userId) & (Relationship.second_user_id == addID)).first()
        if (rel2):
            db.session.delete(rel2)
        db.session.commit()
        UserRelationship = Relationship.query.all()
        relationships = [relationship.to_dict() for relationship in UserRelationship]
        return {'relationships': relationships}


# @relationship_routes.route('/', methods=['DELETE'])
# def delete_relationships ():
#     userId= int(current_user.id)
#     res = request.get_json()
#     blockedID = int(res['blockid'])
#     rel1=db.session.query(Relationship).filter((Relationship.first_user_id == blockedID) & (Relationship.second_user_id == userId)).first()
#     rel2=db.session.query(Relationship).filter((Relationship.first_user_id == userId ) & (Relationship.second_user_id == blockedID)).first()
#     db.session.delete(rel1)
#     db.session.delete(rel2)
#     db.session.commit()
#     UserRelationship = Relationship.query.all()
#     relationships = [relationship.to_dict() for relationship in UserRelationship]
#     return {'relationships': relationships}
