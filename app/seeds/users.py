from werkzeug.security import generate_password_hash
from app.models import db, User
from faker import Faker
import random

# Adds a demo user, you can add other users here if you want
faker = Faker()
# Adds a demo user, you can add other users here if you want

avatars = [
    'https://discord-clone-bill.s3.us-east-2.amazonaws.com/icons8-discord-100.png',
    'https://discord-clone-bill.s3.us-east-2.amazonaws.com/icons8-discord-24.png',
    'https://discord-clone-bill.s3.us-east-2.amazonaws.com/icons8-discord-24.png',
    'https://discord-clone-bill.s3.us-east-2.amazonaws.com/icons8-discord-32.png',
    'https://discord-clone-bill.s3.us-east-2.amazonaws.com/icons8-discord-48.png',
    'https://discord-clone-bill.s3.us-east-2.amazonaws.com/icons8-discord-50.png',
    'https://discord-clone-bill.s3.us-east-2.amazonaws.com/icons8-discord-64.png',
    'https://discord-clone-bill.s3.us-east-2.amazonaws.com/icons8-discord-new-24.png',
    'https://discord-clone-bill.s3.us-east-2.amazonaws.com/icons8-discord-new-48.png',
    'https://discord-clone-bill.s3.us-east-2.amazonaws.com/icons8-discord-new-64.png'
]
    

def seed_users():
    hash_password = generate_password_hash('password')
    demo = User(username='Demo', email='demo@aa.io',
                hashed_password=hash_password, avatar_link="")
    db.session.add(demo)

    for i in range(2, 100):
        hash_password = generate_password_hash('password')
        temp = User(username=faker.user_name(), email=faker.email(),
                    hashed_password=hash_password, avatar_link=random.choice(avatars))
        db.session.add(temp)
        db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
