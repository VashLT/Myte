from app import build_myte

from config import Config

myte = build_myte()

if __name__ == "__main__":
    myte.run(
        host=Config.SERVER,
        port=Config.PORT,
        debug=Config.FLASK_DEBUG
    )
