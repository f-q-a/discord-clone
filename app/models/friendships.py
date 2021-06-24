from .db import db

class Friendship(db.Model):
    __tablename__ = 'friend'
    fk_user_from = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    fk_user_to = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    extra_field = db.Column(db.Integer)


class User (db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    user_to = db.relationship('Friendship',backref='to', primaryjoin=id==Friendship.fk_user_to)
    user_from = db.relationship('Friendship',backref='from', primaryjoin=id==Friendship.fk_user_from )
