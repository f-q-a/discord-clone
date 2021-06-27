# from werkzeug.security import generate_password_hash
from app.models import db, Relationship
from faker import Faker
faker = Faker()

# Adds a demo user, you can add other users here if you want


def seed_relationships():

    demo1 = Relationship(first_user_id=1, second_user_id=2, relationship='None')# None/Accepted/Blocked/Pending
    demo2 = Relationship(first_user_id=1, second_user_id=3, relationship='None')#
    demo3 = Relationship(first_user_id=1, second_user_id=4, relationship='Accepted')#
    demo4 = Relationship(first_user_id=1, second_user_id=5, relationship='Accepted')#
    demo5 = Relationship(first_user_id=1, second_user_id=6, relationship='Blocked')#
    demo6 = Relationship(first_user_id=1, second_user_id=7, relationship='Blocked')#
    demo7 = Relationship(first_user_id=1, second_user_id=8, relationship='Pending')#
    demo8 = Relationship(first_user_id=1, second_user_id=9, relationship='Pending')#
    demo9 = Relationship(first_user_id=1, second_user_id=10, relationship='None')#

    demo10 = Relationship(first_user_id=2, second_user_id=1, relationship='None')# None/Accepted/Blocked/Pending#
    demo11 = Relationship(first_user_id=2, second_user_id=3, relationship='None')#
    demo12 = Relationship(first_user_id=2, second_user_id=4, relationship='Accepted')#
    demo13 = Relationship(first_user_id=2, second_user_id=5, relationship='Accepted')#
    demo14 = Relationship(first_user_id=2, second_user_id=6, relationship='Blocked')#
    demo15 = Relationship(first_user_id=2, second_user_id=7, relationship='Blocked')#
    demo16 = Relationship(first_user_id=2, second_user_id=8, relationship='Pending')#
    demo17 = Relationship(first_user_id=2, second_user_id=9, relationship='Pending')#
    demo18 = Relationship(first_user_id=2, second_user_id=10, relationship='None')#

    demo19 = Relationship(first_user_id=3, second_user_id=1, relationship='None')# None/Accepted/Blocked/Pending#
    demo20 = Relationship(first_user_id=3, second_user_id=2, relationship='None')#
    demo21 = Relationship(first_user_id=3, second_user_id=4, relationship='Accepted')#
    demo22 = Relationship(first_user_id=3, second_user_id=5, relationship='Accepted')#
    demo23 = Relationship(first_user_id=3, second_user_id=6, relationship='Blocked')#
    demo24 = Relationship(first_user_id=3, second_user_id=7, relationship='Blocked')#
    demo25 = Relationship(first_user_id=3, second_user_id=8, relationship='Pending')#
    demo26 = Relationship(first_user_id=3, second_user_id=9, relationship='Pending')#
    demo27 = Relationship(first_user_id=3, second_user_id=10, relationship='None')#

    demo28 = Relationship(first_user_id=4, second_user_id=1, relationship='Accepted')# None/Accepted/Blocked/Pending#
    demo29 = Relationship(first_user_id=4, second_user_id=2, relationship='Accepted')#
    demo30 = Relationship(first_user_id=4, second_user_id=3, relationship='Accepted')#
    demo31 = Relationship(first_user_id=4, second_user_id=5, relationship='Accepted')#
    demo32 = Relationship(first_user_id=4, second_user_id=6, relationship='Blocked')#
    demo33 = Relationship(first_user_id=4, second_user_id=7, relationship='Blocked')#
    demo34 = Relationship(first_user_id=4, second_user_id=8, relationship='Pending')#
    demo35 = Relationship(first_user_id=4, second_user_id=9, relationship='Pending')#
    demo36 = Relationship(first_user_id=4, second_user_id=10, relationship='None')#

    demo37 = Relationship(first_user_id=5, second_user_id=1, relationship='Accepted')# None/Accepted/Blocked/Pending
    demo38 = Relationship(first_user_id=5, second_user_id=2, relationship='Accepted')#
    demo39 = Relationship(first_user_id=5, second_user_id=3, relationship='Accepted')#
    demo40 = Relationship(first_user_id=5, second_user_id=4, relationship='Accepted')#
    demo41 = Relationship(first_user_id=5, second_user_id=6, relationship='Blocked')#
    demo42 = Relationship(first_user_id=5, second_user_id=7, relationship='Blocked')#
    demo43 = Relationship(first_user_id=5, second_user_id=8, relationship='Pending')#
    demo44 = Relationship(first_user_id=5, second_user_id=9, relationship='None')#
    demo45 = Relationship(first_user_id=5, second_user_id=10, relationship='None')#

    demo46 = Relationship(first_user_id=6, second_user_id=1, relationship='Blocked')# None/Accepted/Blocked/Pending
    demo47 = Relationship(first_user_id=6, second_user_id=2, relationship='Blocked')#
    demo48 = Relationship(first_user_id=6, second_user_id=3, relationship='Blocked')#
    demo49 = Relationship(first_user_id=6, second_user_id=4, relationship='Blocked')#
    demo50 = Relationship(first_user_id=6, second_user_id=5, relationship='Blocked')#
    demo51 = Relationship(first_user_id=6, second_user_id=7, relationship='Blocked')#
    demo52 = Relationship(first_user_id=6, second_user_id=8, relationship='Pending')#
    demo53 = Relationship(first_user_id=6, second_user_id=9, relationship='None')#
    demo54 = Relationship(first_user_id=6, second_user_id=10, relationship='None')#

    demo55 = Relationship(first_user_id=7, second_user_id=1, relationship='Blocked')# None/Accepted/Blocked/Pending
    demo56 = Relationship(first_user_id=7, second_user_id=2, relationship='Blocked')#
    demo57 = Relationship(first_user_id=7, second_user_id=3, relationship='Blocked')#
    demo58 = Relationship(first_user_id=7, second_user_id=4, relationship='Blocked')#
    demo59 = Relationship(first_user_id=7, second_user_id=5, relationship='Blocked')#
    demo60 = Relationship(first_user_id=7, second_user_id=6, relationship='Blocked')#
    demo61 = Relationship(first_user_id=7, second_user_id=8, relationship='Pending')#
    demo62 = Relationship(first_user_id=7, second_user_id=9, relationship='Pending')#
    demo63 = Relationship(first_user_id=7, second_user_id=10, relationship='None')#

    demo64 = Relationship(first_user_id=8, second_user_id=1, relationship='Pending')# None/Accepted/Blocked/Pending
    demo65 = Relationship(first_user_id=8, second_user_id=2, relationship='Pending')#
    demo66= Relationship(first_user_id=8, second_user_id=3, relationship='Pedning')
    demo67 = Relationship(first_user_id=8, second_user_id=4, relationship='Pending')#
    demo68 = Relationship(first_user_id=8, second_user_id=5, relationship='Pending')#
    demo69 = Relationship(first_user_id=8, second_user_id=6, relationship='None')#
    demo70 = Relationship(first_user_id=8, second_user_id=7, relationship='Pending')#
    demo71 = Relationship(first_user_id=8, second_user_id=9, relationship='None')#
    demo72 = Relationship(first_user_id=8, second_user_id=10, relationship='None')#

    demo73 = Relationship(first_user_id=9, second_user_id=1, relationship='Pending')# None/Accepted/Blocked/Pending
    demo74 = Relationship(first_user_id=9, second_user_id=2, relationship='Pending')#
    demo75 = Relationship(first_user_id=9, second_user_id=3, relationship='Pending')#
    demo76 = Relationship(first_user_id=9, second_user_id=4, relationship='Pending')#
    demo77 = Relationship(first_user_id=9, second_user_id=5, relationship='Blocked')
    demo78 = Relationship(first_user_id=9, second_user_id=6, relationship='Blocked')#
    demo79 = Relationship(first_user_id=9, second_user_id=7, relationship='Pending')#
    demo80 = Relationship(first_user_id=9, second_user_id=8, relationship='None')#
    demo81 = Relationship(first_user_id=9, second_user_id=10, relationship='None')#

    demo82 = Relationship(first_user_id=10, second_user_id=1, relationship='None')# None/Accepted/Blocked/Pending
    demo83 = Relationship(first_user_id=10, second_user_id=2, relationship='None')#
    demo84 = Relationship(first_user_id=10, second_user_id=3, relationship='None')#
    demo85 = Relationship(first_user_id=10, second_user_id=4, relationship='None')#
    demo86 = Relationship(first_user_id=10, second_user_id=5, relationship='None')#
    demo87 = Relationship(first_user_id=10, second_user_id=6, relationship='None')#
    demo88 = Relationship(first_user_id=10, second_user_id=7, relationship='None')#
    demo89 = Relationship(first_user_id=10, second_user_id=8, relationship='None')#
    demo90 = Relationship(first_user_id=10, second_user_id=9, relationship='None')#



    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)
    db.session.add(demo9)
    db.session.add(demo10)
    db.session.add(demo11)
    db.session.add(demo12)
    db.session.add(demo13)
    db.session.add(demo14)
    db.session.add(demo15)
    db.session.add(demo16)
    db.session.add(demo17)
    db.session.add(demo18)
    db.session.add(demo19)
    db.session.add(demo20)
    db.session.add(demo21)
    db.session.add(demo22)
    db.session.add(demo23)
    db.session.add(demo24)
    db.session.add(demo25)
    db.session.add(demo26)
    db.session.add(demo27)
    db.session.add(demo28)
    db.session.add(demo29)
    db.session.add(demo30)
    db.session.add(demo31)
    db.session.add(demo32)
    db.session.add(demo33)
    db.session.add(demo34)
    db.session.add(demo35)
    db.session.add(demo36)
    db.session.add(demo37)
    db.session.add(demo38)
    db.session.add(demo39)
    db.session.add(demo40)
    db.session.add(demo41)
    db.session.add(demo42)
    db.session.add(demo43)
    db.session.add(demo44)
    db.session.add(demo45)
    db.session.add(demo46)
    db.session.add(demo47)
    db.session.add(demo48)
    db.session.add(demo49)
    db.session.add(demo50)
    db.session.add(demo51)
    db.session.add(demo52)
    db.session.add(demo53)
    db.session.add(demo54)
    db.session.add(demo55)
    db.session.add(demo56)
    db.session.add(demo57)
    db.session.add(demo58)
    db.session.add(demo59)
    db.session.add(demo60)
    db.session.add(demo61)
    db.session.add(demo62)
    db.session.add(demo63)
    db.session.add(demo64)
    db.session.add(demo65)
    db.session.add(demo66)
    db.session.add(demo67)
    db.session.add(demo68)
    db.session.add(demo69)
    db.session.add(demo70)
    db.session.add(demo71)
    db.session.add(demo72)
    db.session.add(demo73)
    db.session.add(demo74)
    db.session.add(demo75)
    db.session.add(demo76)
    db.session.add(demo77)
    db.session.add(demo78)
    db.session.add(demo79)
    db.session.add(demo80)
    db.session.add(demo81)
    db.session.add(demo82)
    db.session.add(demo83)
    db.session.add(demo84)
    db.session.add(demo85)
    db.session.add(demo86)
    db.session.add(demo87)
    db.session.add(demo88)
    db.session.add(demo89)
    db.session.add(demo90)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_relationships():
    db.session.execute('TRUNCATE relationships RESTART IDENTITY CASCADE;')
    db.session.commit()
