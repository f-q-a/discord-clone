from app.models.user import User
from .db import db
from datetime import datetime
from app.models import User, Server

server_users = db.Table('server_users',

    db.Column('server_id', db.Integer, db.ForeignKey(
        'servers.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey(
        'users.id'), primary_key=True)
)

db.metadata.clear()


class ServerUser(db.Model):

    __tablename__ ="server_users"

    id= db.Column(db.Integer, primary_key=True)
    server_id= db.Column(db.Integer, db.ForeignKey(Server.id), nullable=False)
    user_id= db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    created_at= db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'server_id': self.server_id,
            'user_id': self.user_id,
            'created_at': self.created_at,
        }
