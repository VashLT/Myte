from flask import Blueprint, render_template

from flask_login import login_required, current_user


views = Blueprint("views", __name__)


@views.route('/')
def welcome():
    return render_template("myte/welcome.html")


@views.route('/error')
def error_404():
    return render_template("myte/error.html")


@views.route('/home')
@login_required
def home():
    return render_template("myte/home.html", user=current_user)


@views.route("/<name>")
def user(name):
    return "Welcome <strong>%s</strong>" % name
