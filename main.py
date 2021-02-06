from config import Config
from app import build_myte

app = build_myte()


if __name__ == "__main__":
    app.run(host=str(Config.SERVER), port=int(Config.PORT), debug=bool(Config.FLASK_DEBUG))
