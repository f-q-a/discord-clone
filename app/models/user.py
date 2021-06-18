from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(40), nullable=False, unique=True)
  email = db.Column(db.String(255), nullable=False, unique=True)
  hashed_password = db.Column(db.String(255), nullable=False)
  avatar_link = db.Column(db.String(50))

  def to_dict(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "email": self.email,
            "hashed_password": self.shed_password,
            "avatar_link ": self.avatar_link
        }
  servers = db.relationship(
        'Server', secondary='server_users', back_populates='users')

server_users = db.Table('server_users',

    db.Column('server_id', db.Integer, db.ForeignKey(
        'servers.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey(
        'users.id'), primary_key=True)
)


class Server(db.Model):

    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    type = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "type": self.type
        }
    channels = db.relationship('Channel', back_populates="server")
    users = db.relationship(
        'User', secondary='server_users', back_populates='servers')


class User(db.Model):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    hashed_password = db.Column(db.String(50), nullable=False)


    def to_dict(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "email": self.email,
            "hashed_password": self.shed_password,
            "avatar_link ": self.avatar_link
        }

    servers = db.relationship(
        'Server', secondary='server_users', back_populates='users')


class Message(db.Model):

    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.String(255), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(
        'channels.id'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "content": self.content,
            "channel_id": self.channel_id
        }

    users = db.relationship('User')
    channels = db.relationship('Channel', back_populates='messages')


class Channel(db.Model):
    __tablename__ = 'channels'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    server_id = db.Column(db.Integer)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "server_id": self.server_id
        }
    server = db.relationship('Server', back_populates="channels")


class UserRelationship(db.Model):
  __tablename__ = 'user_relationships'
  first_user_id = db.Column(
      db.Integer, db.ForeignKey('users.id'), nullable=False)
  second_user_id = db.Column(
      db.Integer, db.ForeignKey('users.id'), nullable=False)
  relationship = db.Column(db.Integer, nullable=False)

  def to_dict(self):
      return {
          "first_user_id": self.first_user_id,
          "second_user_id": self.second_user_id,
          "relationship": self.relationship
      }


  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email
    }
