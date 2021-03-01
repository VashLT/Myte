from datetime import datetime

from flask import Blueprint, render_template, request, flash, url_for, session, redirect

from flask_wtf import FlaskForm

from wtforms.fields.html5 import DateField
from wtforms.validators import DataRequired
from wtforms import validators, SubmitField

from .models import Usuario, MetaUsuario, Rol
from . import db, mysql
from . import utils


auth = Blueprint("auth", __name__)

TIME_FORMAT = r"%Y-%m-%d"
ID_ROL = 1


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
    c = mysql.get_db().cursor()
    if form.validate_on_submit():
        new_user = None
        user_data = request.form
        print("checking user data ...")
        if check_user(user_data):

            meta = MetaUsuario(
                nombre_usuario=user_data["username"],
                clave_encriptada=utils.encrypt(user_data["password1"])
            )
            rol = Rol.query.get(ID_ROL)
            new_user = Usuario(
                nombre_usuario=meta.nombre_usuario,
                nombre=utils.format_name(user_data["name"]),
                id_rol=rol.id,
                email=user_data["email"],
                fecha_nacimiento=user_data["date"]
            )
            
        if new_user:
            print(new_user)
            print("adding models ...")
            db.session.add(meta)
            db.session.add(new_user)
            db.session.commit()
            return redirect(url_for('views.home'))
    return render_template("myte/register.html", form=form)


def check_user(user_data):
    state = True
    if MetaUsuario.query.get(user_data["username"]):
        flash("Username already exists", category="error")
        state = False
    if user_data["password1"] != user_data["password2"]:
        flash("Passwords must be the same!", category="error")
        state = False
    if not utils.is_email(user_data["email"]):
        flash("Incorrect email", category="error")
        state = False
    return state
