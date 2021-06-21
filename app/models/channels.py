from .db import db
from datetime import datetime


class Channel(db.Model):
    __tablename__ = 'channels'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "server_id": self.server_id
        }
    server = db.relationship('Server', back_populates="channels")
    messages = db.relationship('Message', back_populates='channel')
