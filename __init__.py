from flask import Flask
from flask_assets import Environment, Bundle


def build_myte():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'A1CF8E3FFAF5AC3C921D59B7CDFC074D3677C4D6B9341009CDEAD6615D90D369'

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
