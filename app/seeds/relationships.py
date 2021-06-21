# from werkzeug.security import generate_password_hash
from app.models import db, Relationship
from faker import Faker
faker = Faker()

# Adds a demo user, you can add other users here if you want


def seed_relationships():

    # demo = User(username='Demo', email='demo@aa.io',
    #             hashed_password='password', avatar_link="")
    # db.session.add(demo)

    for i in range(1, 100):
        temp = Relationship(first_user_id=1, second_user_id=i, relationship='Accept')
        db.session.add(temp)



    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_relationships():
    db.session.execute('TRUNCATE relationships RESTART IDENTITY CASCADE;')
    db.session.commit()