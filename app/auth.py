from datetime import datetime

from flask import Blueprint, render_template, request, flash, url_for, session

from flask_wtf import FlaskForm

from wtforms.fields.html5 import DateField
from wtforms.validators import DataRequired
from wtforms import validators, SubmitField

from .models import User
from . import db


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
    print(form.date)
    if form.validate_on_submit():
        session['date'] = form.date.data
        print(request.form)
    return render_template("myte/register.html", current_date=datetime.now().strftime(TIME_FORMAT),  form=form)
