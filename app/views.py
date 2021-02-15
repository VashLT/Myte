from flask import Blueprint, render_template

views = Blueprint("views", __name__)


@views.route('/')
def home():
    return render_template("myte/home.html")


@views.route("/<name>")
def user(name):
    return "Welcome <strong>%s</strong>" % name
