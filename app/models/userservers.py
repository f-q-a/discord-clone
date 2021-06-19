from .db import db
from datetime import datetime


server_users = db.Table('server_users',

    db.Column('server_id', db.Integer, db.ForeignKey(
        'servers.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey(
        'users.id'), primary_key=True)
)


class ServerUser(db.Models):

    __tablename__ ="server_user"

    id= db.Column(db.Integer, primary_key=True)
    server_id= db.Column(db.Integer, db.ForeignKey('servers.id'), nullable=False)
    user_id= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at= db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'server_id': self.server_id,
            'user_id': self.user_id,
            'created_at': self.created_at,
        }
