from flask import Flask
from flask_assets import Environment, Bundle
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def build_myte():
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object('config.Config')

    from .auth import auth
    from .views import views

    # SCSS rendering
    assets = Environment(app)

    assets.url = app.static_url_path
    assets.debug = True

    scss = Bundle('sass\style.sass', filters='pyscss', output='gen/style.css')
    assets.register('scss_all', scss)

    app.register_blueprint(views, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/")

    db.init_app(app)

    return app
