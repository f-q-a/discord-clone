from app.models.user import User
from .db import db
from datetime import datetime
from app.models import User, Server

class ServerUser(db.Model):

    __tablename__ ="server_users"

    id= db.Column(db.Integer, primary_key=True)
    server_id= db.Column(db.Integer, db.ForeignKey('servers.id'), nullable=False)
    user_id= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    servers = db.relationship('Server', back_populates='server_users')
    def to_dict(self):
        return {
            'id': self.id,
            'server_id': self.server_id,
            'user_id': self.user_id,
            'created_at': self.created_at,
        }
