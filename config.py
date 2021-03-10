from dotenv import load_dotenv
from pathlib import Path
import os

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

MAX_FILES = 3

# database use
ADAPTER = "mysql"

DB_NAME = "myte"
SERVER = os.getenv('DB_HOST')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')


class Config:
    """ set Flask configuration vars from .env file. """

    FLASK_DEBUG = bool(os.getenv('FLASK_DEBUG'))
    SECRET_KEY = os.getenv('SECRET_KEY')

    # files upload
    UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER")
    ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg', 'gif'}

    SQLALCHEMY_DATABASE_URI = f'{ADAPTER}://{DB_USER}:{DB_PASSWORD}@{SERVER}/{DB_NAME}'

    MYSQL_DATABASE_HOST = SERVER
    MYSQL_DATABASE_PORT = int(os.getenv("DB_PORT"))
    MYSQL_DATABASE_USER = DB_USER
    MYSQL_DATABASE_PASSWORD = DB_PASSWORD
    MYSQL_DATABASE_DB = DB_NAME

    SERVER = os.getenv('SERVER')
    PORT = int(os.getenv('PORT'))

    if not bool(os.getenv('ENABLE_CACHE')):
        SEND_FILE_MAX_AGE_DEFAULT = 0

    # if FLASK_DEBUG:
    #     SQLALCHEMY_ECHO = True
