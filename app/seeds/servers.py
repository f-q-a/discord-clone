# from werkzeug.security import generate_password_hash
from app.models import db, Server
from faker import Faker

faker = Faker()

# Adds a demo user, you can add other users here if you want


def seed_servers():

    # demo = User(username='Demo', email='demo@aa.io',
    #             hashed_password='password', avatar_link="")
    # db.session.add(demo)

    for i in range(1, 100):
        temp = Server(name= faker.company(), user_id=i,
                type='Private')
        db.session.add(temp)

    # for j in range(1, 10):
    #     for i in range(1, 10):
    #         temp1 = Server(name= faker.company(), user_id=i, type='Public')
    #         db.session.add(temp1)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
