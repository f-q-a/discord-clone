# from app.models.user import User
from .db import db
from datetime import datetime
from app.models import User, Server

class ServerUser(db.Model):

    __tablename__ ="server_users"

    server_id= db.Column(db.Integer, db.ForeignKey(Server.id), nullable=False, primary_key=True)
    user_id= db.Column(db.Integer, db.ForeignKey(User.id), nullable=False, primary_key=True)
    