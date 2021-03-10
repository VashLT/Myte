from flask import Flask
from flask_assets import Environment, Bundle
from flask_sqlalchemy import SQLAlchemy
from flaskext.mysql import MySQL
from flask_datepicker import datepicker
from flask_login import LoginManager
from webassets.env import url_prefix_join

db = SQLAlchemy()
mysql = MySQL()


def build_myte():
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object('config.Config')

    from .auth import auth
    from .views import views
    from .models import Usuario

    # SCSS rendering
    assets = Environment(app)

    assets.url = app.static_url_path
    assets.debug = True

    scss = Bundle('scss\style.scss', filters='pyscss',
                  depends=('**/*.scss'), output='gen/style.css')
    assets.register('scss_all', scss)

    # views
    app.register_blueprint(views, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/")

    # login utils
    login_manager = LoginManager()
    # default view to redirect when user is not logged in
    login_manager.login_view = 'auth.login'
    login_manager.login_message = 'You need to be logged in'
    login_manager.login_message_category = 'warning'

    @login_manager.user_loader
    def load_user(id):
        return Usuario.query.get(int(id))

    db.init_app(app)
    db.make_connector(app)
    login_manager.init_app(app)
    mysql.init_app(app)

    datepicker(app)

    return app
