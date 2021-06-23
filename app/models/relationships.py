from .db import db
from datetime import datetime
from app.models import User

class Relationship(db.Model):
    __tablename__ = 'relationships'
    first_user = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, primary_key=True)
    second_user = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, primary_key=True)
    relationship = db.Column(db.String(20), nullable=False)

    def to_dict(self):
        return {
            "first_user": self.first_user,
            "second_user": self.second_user,
            "relationship": self.relationship
        }
