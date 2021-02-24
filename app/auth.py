from flask import Blueprint, render_template, request, flash

from .models import User
from . import db

auth = Blueprint("auth", __name__)


@auth.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        details = request.form
        name = details["username"]
        pw = details["password"]

        print(name, " and pw")

        flash("Succesfully logged in")

    return render_template("myte/login.html")


@auth.route("/register", methods=["POST", "GET"])
def register():
    return "<h1>Register view</h1>"
