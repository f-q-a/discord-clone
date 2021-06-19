from .db import db
from datetime import datetime


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'),nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.body,
            'user_id': self.user_id,
            'channel_id': self.channel_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    users = db.relationship('User')
    channels = db.relationship('Channel', back_populates='messages')
