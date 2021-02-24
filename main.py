from app import build_myte

from config import Config

myte = build_myte()

if __name__ == "__main__":
    myte.run(
        host=str(Config.SERVER),
        port=int(Config.PORT),
        debug=bool(Config.FLASK_DEBUG)
    )
