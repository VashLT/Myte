from dotenv import load_dotenv
from pathlib import Path
import os

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

# database use
ADAPTER = "mysql"

DB_NAME = "database."
SERVER = os.getenv('DB_HOST')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_PORT = int(os.getenv('DB_PORT'))


class Config:
    """ set Flask configuration vars from .env file. """

    FLASK_DEBUG = os.getenv('FLASK_DEBUG')
    SECRET_KEY = os.getenv('SECRET_KEY')

    SQLALCHEMY_DATABASE_URI = f'{ADAPTER}:////{DB_USER}:{DB_PASSWORD}@{SERVER}:{DB_PORT}/{DB_NAME}'

    SERVER = os.getenv('SERVER')
    PORT = os.getenv('PORT')

    if not bool(os.getenv('ENABLE_CACHE')):
        SEND_FILE_MAX_AGE_DEFAULT = 0
