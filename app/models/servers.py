from .db import db
from datetime import datetime
from app.models import User

class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    type = db.Column(db.String(8), nullable=True) # Private, Public
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
            'type': self.type,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    channels = db.relationship('Channel', back_populates="server")
    users = db.relationship('User', secondary='server_users', back_populates='servers')
