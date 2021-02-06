from dotenv import load_dotenv
from pathlib import Path
import os

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)


class Config:
    """ set Flask configuration vars from .env file. """

    FLASK_DEBUG = os.getenv('FLASK_DEBUG')
    SECRET_KEY = os.getenv('SECRET_KEY')
    SERVER = os.getenv('SERVER')
    PORT = os.getenv('PORT')
    if not bool(os.getenv('ENABLE_CACHE')):
        SEND_FILE_MAX_AGE_DEFAULT = 0
