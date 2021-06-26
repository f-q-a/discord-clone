from .db import db
from datetime import datetime
from app.models import User, ServerUser, Server

class Relationship(db.Model):
    __tablename__ = 'relationships'
    first_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, primary_key=True)
    second_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, primary_key=True)
    relationship = db.Column(db.String(20), nullable=False)

    first_user = db.relationship('User', foreign_keys="Relationship.first_user_id", cascade="all,delete")
    second_user = db.relationship('User', foreign_keys="Relationship.second_user_id", cascade="all,delete")


    def to_dict(self):
        return {
            "first_user_id": self.first_user_id,
            "second_user_id": self.second_user_id,
            "relationship": self.relationship,
        }
