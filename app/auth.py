from flask import Blueprint, render_template

auth = Blueprint("auth", __name__)


@auth.route("/login", methods=["POST", "GET"])
def login():
    return render_template("myte/login.html")

@auth.route("/register", methods=["POST", "GET"])
def register():
    return "<h1>Register view</h1>"

