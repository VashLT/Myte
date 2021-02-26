from datetime import datetime

from flask import Blueprint, render_template, request, flash, url_for, session, redirect

from flask_wtf import FlaskForm

from wtforms.fields.html5 import DateField
from wtforms.validators import DataRequired
from wtforms import validators, SubmitField

from .models import Usuario, MetaUsuario
from . import db
from . import utils


auth = Blueprint("auth", __name__)

TIME_FORMAT = r"%Y-%m-%d"


class DateForm(FlaskForm):
    date = DateField(
        'Birthdate: ',
        format=TIME_FORMAT,
        validators=(validators.DataRequired(),)
    )


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
    form = DateForm()
    if form.validate_on_submit():
        print(request.form)
        new_user = check_user(request.form)
        if new_user:
            # TODO: add user to database
            pass
    return render_template("myte/register.html", current_date=datetime.now().strftime(TIME_FORMAT),  form=form)


def check_user(user_data):
    if user_data["password1"] != user_data["password2"]:
        flash("Passwords must be the same!", category="error")
    meta = MetaUsuario(
        nombre_usuario=user_data["username"],
        clave_encriptada=utils.encrypt(user_data["password1"])
    )
    return Usuario(
        nombre_usuario=meta.nombre_usuario,
        nombre=utils.format_name(user_data["name"]),
        email=user_data["email"],
        fecha_nacimiento=user_data["date"]
    )
