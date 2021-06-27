# from werkzeug.security import generate_password_hash
from app.models import db, ServerUser
from faker import Faker

faker = Faker()

# Adds a demo user, you can add other users here if you want


def seed_userservers():

    # demo = User(username='Demo', email='demo@aa.io',
    #             hashed_password='password', avatar_link="")
    # db.session.add(demo)

    for i in range(1, 10):
        for j in range(1, 10):
            temp = ServerUser(server_id=i, user_id=j)
            db.session.add(temp)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_userservers():
    db.session.execute('TRUNCATE server_users RESTART IDENTITY CASCADE;')
    db.session.commit()
