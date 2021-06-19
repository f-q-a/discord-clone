from .db import db
from datetime import datetime


class Relationship(db.Models):

    __tablename__ ="relationships"

    id= db.Column(db.Integer, primary_key=True)
    first_user_id= db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True, nullable=False)
    second_user_id= db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True, nullable=False)
    relationship = db.Column(db.String(8), nullable=False) #Blocked,Pending,Accept

    def to_dict(self):
        return {
            'id': self.id,
            'first_user_id': self.user_id,
            'second_user_id': self.user_id,
            'relationship':self.relationship
        }
