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

# Debugging
import traceback


auth = Blueprint("auth", __name__)

TIME_FORMAT = r"%Y-%m-%d"
ID_ROL = 1


class Cache(object):
    """ store inputted data at register stage """
    register = {}


class DateForm(FlaskForm):
    date = DateField(
        'Fecha de Nacimiento: ',
        format=TIME_FORMAT,
        validators=(validators.DataRequired(),)
    )
# pylint: disable=bad-option-value
# pylint: disable=no-member


@auth.route("/login", methods=["POST", "GET"])
def login():
    mysql_cursor = mysql.get_db().cursor()
    if request.method == "POST":
        details = request.form
        name = details["username"]
        pw = details["password"]

        meta = MetaUsuario.query.filter_by(
            nombre_usuario=name, clave_encriptada=utils.encrypt(pw)).first()
        if meta:
            flash("Succesfully logged in", category="success")
            login_user(meta.usuario, remember=True)
            mysql_cursor.execute("""
                UPDATE MyteVar SET valor = %s WHERE nombre = "current_user"
            """, (meta.usuario.id))
            mysql.get_db().commit()
            return redirect(url_for('views.home'))
        else:
            flash("Nombre de usuario o contraseña incorrectos", category="error")
    return render_template("myte/login.html")


@auth.route("/register", methods=["POST", "GET"], defaults={"stage": "1"})
@auth.route("/register/<stage>", methods=["POST", "GET"])
def register(stage):
    form = DateForm()
    mysql_cursor = mysql.get_db().cursor()
    if stage == '1':
        post_data = request.form
        if "user" in Cache.register:
            cache_user = Cache.register["user"]
        else:
            cache_user = None

        if request.method == 'GET':
            return render_template('myte/register.html', form=form, stage=1, prefill=True, cache_user=cache_user)

        if not form.validate_on_submit() or not check_user(post_data):
            return render_template('myte/register.html', form=form, stage=1, prefill=False, cache_user=None)

        data = {}
        data.setdefault("nombre_usuario", post_data["username"])
        data.setdefault("nombre", post_data["name"])
        data.setdefault("email", post_data["email"])
        data.setdefault("fecha_nacimiento", post_data["date"])

        Cache.register["meta"] = post_data["password1"]
        Cache.register["user"] = data

        return redirect(url_for('auth.register', stage=2))

    elif stage == '2':
        if request.method == 'GET':
            if not Cache.register:
                return redirect(url_for(
                    'auth.register',
                    stage='1'
                ))
            try:
                careers = utils.dictionarize(mysql_cursor, 'carrera')
                levels = utils.dictionarize(mysql_cursor, 'niveleducativo')
                return render_template('myte/register.html', form=form, stage=2, prefill=False, careers=careers, levels=levels)

            except Exception as ex:
                return render_template('myte/404.html', title="Internal error", description="failed at loading careers and educational levels", trace=traceback.format_exc())

        else:
            # TODO: assign formulas based on given data about academical level and career
            if not "user" in Cache.register:
                raise Exception(
                    "Expected user data from previous stage")
            user_data = Cache.register["user"]
            post_data = request.form

            if 'back' in request.form:
                return redirect(url_for(
                    'auth.register',
                    stage='1'
                ))
            # registration is valid and store in db
            elif 'completed' in request.form and check_extra_data(post_data):
                meta = MetaUsuario(
                    nombre_usuario=user_data["nombre_usuario"],
                    clave_encriptada=utils.encrypt(
                        Cache.register["meta"])
                )
                new_user = Usuario(
                    id_rol=Rol.query.get(ID_ROL).id,
                    **user_data
                )
                new_user.nombre = utils.format_name(
                    user_data["nombre"])
                try:
                    db.session.add(meta)
                    db.session.add(new_user)
                    db.session.commit()
                    login_user(new_user, remember=True)
                    mysql_cursor.execute("""
                        UPDATE MyteVar SET valor = %s WHERE nombre="current_user" """, (meta.usuario.id))
                    mysql.get_db().commit()
                    return redirect(url_for('auth.register', stage='3'))
                except Exception as e:
                    print(
                        f'User registration failed!, printing exception: {e}')
                    traceback.print_exc()
                    db.session.rollback()

            return redirect(url_for(
                'auth.register',
                stage='2',
            ))

    elif stage == '3':
        flash("Welcome %s" %
              new_user.nombre_usuario, category='success')
        Cache.register = {}  # register end and cache is claned

        return redirect(url_for('views.home'))

    else:
        return render_template('myte/404.html', title="Page not found", description="Stage argument failed.")


@ auth.route("/logout", methods=["POST", "GET"])
@ login_required
def logout():
    logout_user()
    return redirect(url_for('views.welcome'))


def check_user(user_data):
    """
        validate user data to create user
    """
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


def check_extra_data(extra_data):
    state = True
    if extra_data["nivel"] == 'select':
        flash("Selecciona un nivel educativo", category="error")
        state = False
    if extra_data["carrera"] == 'select':
        flash("Selecciona una carrera", category="error")
        state = False
    return state


# def check_changes(meta, data):
#     new_user = meta.usuario
#     if meta.nombre_usuario != data['username']:
#         meta.nombre_usuario = new_user.nombre_usuario = data["username"]

#         flag_modified(new_user, "nombre_usuario")
#         flag_modified(meta, "nombre_usuario")
#     if meta.clave_encriptada != utils.encrypt(data["password1"]):
#         meta.nombre_usuario = utils.encrypt(data["password1"])
#         flag_modified(meta, "clave_encriptada")
#     if new_user.email != data["email"]:
#         new_user.email = data["email"]
#         flag_modified(new_user, "email")
#     if new_user.fecha_nacimiento != data["date"]:
#         new_user.fecha_nacimiento = data["date"]
#         flag_modified(new_user, "fecha_nacimiento")

#     db.session.merge(meta)
#     db.session.merge(new_user)
#     db.session.flush()
