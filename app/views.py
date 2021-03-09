from flask import Blueprint, render_template, flash

from flask_login import login_required, current_user

from .models import Usuario, MetaUsuario, Rol, Tag, TagFormula, Imagen, Formula, Historial
from . import db, mysql
from . import utils

import random


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


@views.route('/home/delete', methods=["POST", "GET"], defaults={"id_formula": None})
@views.route('/home/delete/<id_formula>', methods=["POST", "GET"])
@login_required
def delete_formula(id_formula):
    return render_template("myte/delete.html")


@views.route('/home/edit', methods=["POST", "GET"], defaults={"id_formula": None})
@views.route('/home/edit/<id_formula>', methods=["POST", "GET"])
@login_required
def edit_formula(id_formula):
    return render_template("myte/edit.html")


@views.route('/home/formulas')
@login_required
def formulas():
    return render_template("myte/formulas.html")


@views.route('/home/images/<id_formula>')
@login_required
def formula_images(id_formula):
    return render_template("myte/images.html")


@views.route('/home/images/<id_formula>')
@login_required
def formula_script(id_formula):
    return render_template("myte/script.html")


def load_formulas(cant_max=20):
    mysql_cursor = mysql.get_db().cursor()
    memo_id = set()

    mysql_cursor.execute(f"""
        SELECT id_formula FROM indice ORDER BY numero_usos DESC LIMIT {cant_max};
    # """)
    formulas = []
    raw_result = mysql_cursor.fetchall()
    if raw_result:
        for record in raw_result:
            id = int(record[0])
            memo_id.add(id)
            formula = Formula.query.get(id)
            latex = formula.codigo_latex
            if r"\n" in latex:
                latex = utils.format_newline(formula.codigo_latex)
            formulas.append(
                {
                    "id": id,
                    "nombre": formula.nombre,
                    "codigo_latex": latex,
                    "tags": lookup_tags(id),
                    "images": formula.imagen,
                    "script": formula.script
                }
            )
    if len(formulas) < cant_max:  # fill rest
        formulas = more_formulas(formulas, memo_id, cant_max)
    print(f"Se encontraron las sig. formulas:\n{formulas}")
    return formulas


def lookup_tags(id_formula):
    if not current_user.is_premium():
        return []
    user_tags = Tag.query.filter_by(id_usuario=current_user.id)
    if not user_tags:
        return []
    tags = [tag for tag in user_tags if TagFormula.query.get(
        (current_user.id, id_formula))]
    print(f"tags {tags} for id_formula: {id_formula}")
    return tags


def more_formulas(freq_formulas, ids, cant_max):
    """
        add randomly the remaining formulas to complete cant_max
    """
    formulas = freq_formulas
    memo_id = ids
    mysql_cursor = mysql.get_db().cursor()

    remaining = cant_max - len(formulas)
    mysql_cursor.execute(""" 
        SELECT id_formula FROM Historial WHERE id_usuario = %s 
        ORDER BY RAND()
        LIMIT %s
    """, (current_user.id, remaining))

    raw_result = mysql_cursor.fetchall()

    if not raw_result:
        return

    for record in raw_result:
        id = int(record[0])
        if id in memo_id:
            continue
        formula = Formula.query.get(id)
        latex = formula.codigo_latex
        if r"\n" in latex:
            latex = utils.format_newline(formula.codigo_latex)
        tags = lookup_tags(id)
        if tags:
            tags = utils.format_tags(tags)
        formulas.append({
            "id": id,
            "nombre": formula.nombre,
            "codigo_latex": latex,
            "tags": tags,
            "images": formula.imagen,
            "script": formula.script
        })
        memo_id.add(id)
    return formulas
