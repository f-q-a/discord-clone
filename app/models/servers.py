from .db import db
from datetime import datetime
from app.models import User

class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    type = db.Column(db.String(8), nullable=True) # Private, Public

    channels = db.relationship('Channel', cascade="all,delete", back_populates='server')
    users = db.relationship('User', cascade="all,delete", secondary="server_users", back_populates='servers')
    owner= db.relationship('User', cascade='all,delete', back_populates='servers')

    def to_dict(self):
        channels = [channel.to_dict() for channel in self.channels]
        # server_users = [user.to_safe_dict() for user in self.server_users]
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
            'type': self.type,
            'channels': channels,
            # 'server_users':server_users
        }
