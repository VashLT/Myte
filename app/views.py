from flask import Blueprint, render_template, flash

from flask_login import login_required, current_user


views = Blueprint("views", __name__)


@views.route('/')
def welcome():
    flash("testing", category="success")
    return render_template("myte/welcome.html")


@views.route('/error')
def error_404():
    return render_template("myte/error.html")


@views.route('/home')
@login_required
def home():
    formulas = load_formulas()
    return render_template("myte/home.html", user=current_user, formulas=formulas)


def load_formulas():
    user = current_user
    return None
