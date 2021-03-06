from datetime import datetime

from flask import Blueprint, render_template, request, flash, url_for, session, redirect, abort

from flask_wtf import FlaskForm

from wtforms.fields.html5 import DateField
from wtforms.validators import DataRequired
from wtforms import validators, SubmitField

from flask_login import login_user, login_required, logout_user, current_user

from .models import Usuario, MetaUsuario, Rol
from . import db, mysql
from . import utils

from sqlalchemy.orm.attributes import flag_modified


auth = Blueprint("auth", __name__)

TIME_FORMAT = r"%Y-%m-%d"
ID_ROL = 1


class DateForm(FlaskForm):
    date = DateField(
        'Fecha de Nacimiento: ',
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


@auth.route("/register", methods=["POST", "GET"], defaults={'stage': '1', 'id': None})
@auth.route("/register/<stage>", methods=["POST", "GET"], defaults={'id': None})
@auth.route("/register/<stage>-<id>", methods=["POST", "GET"])
def register(stage, id):
    form = DateForm()
    prefill = new_user = None
    c = mysql.get_db().cursor()
    try:
        if stage == '2':
            if request.method == 'GET':
                return render_template('myte/register.html', form=form, stage=2, prefill=prefill, cache_user=new_user)
            else:
                # TODO: assign formulas based on given data about academical level and career
                new_user = Usuario.query.filter_by(
                    nombre_usuario=id).first()
                print(new_user)
                if 'back' in request.form:
                    return redirect(url_for(
                        'auth.register',
                        stage=1,
                        id=new_user.nombre_usuario,
                    ))
                    return render_template('myte/register.html', form=form, stage=1, prefill=True, cache_user=new_user)

                elif 'completed' in request.form:
                    db.session.commit()
                    login_user(new_user, remember=True)
                    return redirect(url_for('views.home'))
                return redirect(url_for(
                    'auth.register',
                    stage=2,
                    id=new_user.nombre_usuario,
                ))
        elif stage == '1':
            user_data = request.form
            if request.method == 'GET':
                if MetaUsuario.query.get(id):
                    prefill = True
                    new_user = Usuario.query.filter_by(
                        nombre_usuario=id).first()
                return render_template('myte/register.html', form=form, stage=1, prefill=True, cache_user=new_user)

            meta = db.session.query(MetaUsuario).get(id)
            print(meta)
            if not form.validate_on_submit() or not check_user(user_data, cache=bool(meta)):
                return render_template('myte/register.html', form=form, stage=1, prefill=False, cache_user=None)

            if meta:
                check_changes(meta, user_data)
            else:
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
                db.session.add(meta)
                db.session.add(new_user)
            db.session.commit()

            return redirect(url_for('auth.register', stage=2, id=new_user.nombre_usuario))
        else:
            return render_template('myte/404.html', title="Page not found", description="Stage argument failed.")

    except Exception as ex:
        print(ex)
        db.session.rollback()
        return render_template('myte/404.html', title="Page not found", description="Something went wrong")


@auth.route("/logout", methods=["POST", "GET"])
@login_required
def logout():
    logout_user()
    return redirect(url_for('views.welcome'))


def check_user(user_data, cache=False):
    state = True
    if MetaUsuario.query.get(user_data["username"]) and not cache:
        flash("Username already exists", category="error")
        state = False
    if user_data["password1"] != user_data["password2"]:
        flash("Passwords must be the same!", category="error")
        state = False
    if not utils.is_email(user_data["email"]):
        flash("Incorrect email", category="error")
        state = False
    return state


def check_changes(meta, data):
    new_user = meta.usuario
    if meta.nombre_usuario != data['username']:
        print("raise error")
        meta.nombre_usuario = new_user.nombre_usuario = data["username"]
        print("raise error?")

        flag_modified(new_user, "nombre_usuario")
        flag_modified(meta, "nombre_usuario")
    if meta.clave_encriptada != utils.encrypt(data["password1"]):
        meta.nombre_usuario = utils.encrypt(data["password1"])
        flag_modified(meta, "clave_encriptada")
    if new_user.email != data["email"]:
        new_user.email = data["email"]
        flag_modified(new_user, "email")
    if new_user.fecha_nacimiento != data["date"]:
        new_user.fecha_nacimiento = data["date"]
        flag_modified(new_user, "fecha_nacimiento")

    db.session.merge(meta)
    db.session.merge(new_user)
    db.session.flush()
