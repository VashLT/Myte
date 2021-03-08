from flask import Blueprint, render_template, flash

from flask_login import login_required, current_user


views = Blueprint("views", __name__)


@views.route('/')
def welcome():
    return render_template("myte/welcome.html")


@views.route('/error')
def error_404():
    return render_template("myte/error.html")


@views.route('/home')
@login_required
def home():
    formulas = load_formulas()
    return render_template("myte/home.html", user=current_user, formulas=formulas)


@views.route('/home/add')
@login_required
def add_formula():
    return render_template("myte/add.html")


@views.route('/home/delete')
@login_required
def delete_formula():
    return render_template("myte/delete.html")


@views.route('/home/formulas')
@login_required
def formulas():
    return render_template("myte/formulas.html")

def load_formulas():
    user = current_user
    return None
