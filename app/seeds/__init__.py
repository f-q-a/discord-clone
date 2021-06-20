from app.seeds.servers import seed_servers, undo_servers
from app.seeds.userservers import seed_userservers, undo_userservers
from flask.cli import AppGroup
from app.models import *
from .users import seed_users, undo_users
from .userservers import seed_userservers, undo_userservers
from .channels import seed_channels, undo_channels
from .servers import seed_servers, undo_servers
from .messages import seed_messages, undo_messages
from .relationships import seed_relationships, undo_relationships


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    seed_users()
    seed_userservers()
    seed_servers()
    seed_channels()
    seed_messages()
    seed_relationships()
    # Add other seed functions here

# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    undo_users()
    undo_userservers()
    undo_servers()
    undo_channels()
    undo_messages()
    undo_relationships()
    # Add other undo functions here
