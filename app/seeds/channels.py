# from werkzeug.security import generate_password_hash
from app.models import db, Channel
from faker import Faker

faker = Faker()

# Adds a demo user, you can add other users here if you want


def seed_channels():

    # demo = User(username='Demo', email='demo@aa.io',
    #             hashed_password='password', avatar_link="")
    # db.session.add(demo)

    for j in range(1, 10):
        for i in range(1, 100):
            temp = Channel(name= faker.job(), server_id=i)
            db.session.add(temp)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
