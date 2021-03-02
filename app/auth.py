from datetime import datetime

from flask import Blueprint, render_template, request, flash, url_for, session, redirect

from flask_wtf import FlaskForm

from wtforms.fields.html5 import DateField
from wtforms.validators import DataRequired
from wtforms import validators, SubmitField

from flask_login import login_user, login_required, logout_user, current_user

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

        meta = MetaUsuario.query.filter_by(
            nombre_usuario=name, clave_encriptada=utils.encrypt(pw)).first()
        if meta:
            flash("Succesfully logged in", category="success")
            login_user(meta.usuario, remember=True)
            return redirect(url_for('views.home'))
        else:
            flash("Nombre de usuario o contraseña incorrectos", category="error")
    return render_template("myte/login.html")


@auth.route("/register", methods=["POST", "GET"])
def register():
    form = DateForm()
    c = mysql.get_db().cursor()
    if form.validate_on_submit():
        new_user = None
        user_data = request.form
        if check_user(user_data):

            meta = MetaUsuario(
                nombre_usuario=user_data["username"],
                clave_encriptada=utils.encrypt(user_data["password1"])
            )
            new_user = Usuario(
                nombre_usuario=meta.nombre_usuario,
                nombre=utils.format_name(user_data["name"]),
                id_rol=Rol.query.get(ID_ROL).id,
                email=user_data["email"],
                fecha_nacimiento=user_data["date"]
            )
        if new_user:
            db.session.add(meta)
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            return redirect(url_for('views.home'))
    return render_template("myte/register.html", form=form)


@auth.route("/logout", methods=["POST", "GET"])
@login_required
def logout():
    logout_user()
    return redirect(url_for('views.welcome'))


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
