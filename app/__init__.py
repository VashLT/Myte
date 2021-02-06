from flask import Flask
from flask_assets import Environment, Bundle


def build_myte():
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object('config.Config')

    # SCSS rendering
    assets = Environment(app)

    assets.url = app.static_url_path
    assets.debug = True

    scss = Bundle('sass\style.sass', filters='pyscss', output='gen/style.css')
    assets.register('scss_all', scss)

    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/")

    return app
