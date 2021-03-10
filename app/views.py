from operator import imod
import os
import traceback
import math

# from scripter import Script

from flask import Blueprint, render_template, flash, request, redirect, url_for

from flask_login import login_required, current_user

from config import MAX_FILES, Config

from .models import Usuario, MetaUsuario, Rol, Tag, TagFormula, Imagen, Formula, Historial, Script
from . import db, mysql
from . import utils

from werkzeug.utils import secure_filename

#

views = Blueprint("views", __name__)


class Cache(object):
    """ store inputted data at add formula """
    add = {}
    active = False

# pylint: disable=bad-option-value
# pylint: disable=no-member


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


@views.route('/liveupdate', methods=["POST", "GET"])
def liveupdate():
    id = request.form.get("id_formula")
    cur = mysql.get_db().cursor()
    try:
        cur.execute("""
            SELECT * FROM Indice
            WHERE id_usuario = %s AND id_formula = %s 
        """, (current_user.id, int(id)))
        if not cur.fetchall():
            cur.execute("""
                INSERT INTO Indice (id_usuario, id_formula, numero_usos) VALUES (
                    %s, %s, 1
                )
            """, (current_user.id, int(id)))
        else:
            cur.execute("""
                UPDATE Indice SET numero_usos = numero_usos + 1 
                WHERE id_usuario = %s AND id_formula = %s
            """, (current_user.id, int(id)))
        mysql.get_db().commit()
        return "increased!!"
    except Exception as ex:
        mysql.get_db().rollback()
        return render_template(
            'myte/404.html',
            title="Internal error",
            description="failed at stage 2",
            trace=traceback.format_exc()
        )


@views.route('/home/add', methods=["POST", "GET"], defaults={"stage": "1"})
@views.route('/home/add/<stage>', methods=["POST", "GET"])
@login_required
def add_formula(stage):
    mysql_cursor = mysql.get_db().cursor()
    if not current_user.is_premium():
        if stage == "1":
            if "formula" in Cache.add:
                cache_formula = Cache.add["formula"]
            else:
                cache_formula = None

            if request.method == "GET":
                return render_template("myte/add_default.html", stage=1, formula=None)

            post_data = request.form

            data = {}
            data.setdefault("codigo_latex", post_data["latex"])
            Cache.add["formula"] = data
            if "render" in post_data:
                return render_template("myte/add_default.html", stage=1, formula=Cache.add["formula"])

            return redirect(url_for("views.add_formula", stage=2))
        else:
            if request.method == "GET":
                return render_template("myte/add_default.html", stage=2, formula=Cache.add["formula"])
            post_data = request.form
            print(post_data)
            if "completed" in post_data:
                Cache.add["formula"].setdefault("nombre", post_data["title"])
                formula = Formula(
                    nombre=post_data["title"],
                    codigo_latex=Cache.add["formula"]["codigo_latex"],
                    creada=True,
                    eliminada=False)
                try:
                    db.session.add(formula)
                    db.session.commit()
                    flash("Formula creada exitosamente!", category='success')
                    return redirect(url_for('views.home'))
                except:
                    db.session.rollback()

    if stage == "1":
        post_data = request.form
        if "formula" in Cache.add:
            cache_formula = Cache.add["formula"]
        else:
            cache_formula = None

        if request.method == "GET":
            if "back" in Cache.add:
                Cache.add.pop("back", None)
                return render_template("myte/add.html", stage=1, formula=Cache.add["formula"])

            return render_template("myte/add.html", stage=1, formula=None, user=current_user)

        data = {}
        data.setdefault("codigo_latex", post_data["latex"])
        Cache.add["formula"] = data
        if "render" in post_data:
            return render_template("myte/add.html", stage=1, formula=Cache.add["formula"])

        return redirect(url_for("views.add_formula", stage=2))

    elif stage == "2":
        try:
            if not Cache.add:
                return redirect(url_for("views.add_formula", stage="1"))
            if request.method == "GET":
                return render_template("myte/add.html", stage=2, formula=Cache.add["formula"])
            post_data = request.form
            print(post_data)
            if "back" in post_data:
                Cache.add["back"] = True
                return redirect(url_for("views.add_formula", stage=1))

            if "completed" in post_data:
                Cache.add["formula"].setdefault(
                    "nombre", post_data["title"])
                data_formula = Cache.add["formula"]
                formula = Formula(
                    id=utils.get_id(mysql_cursor, "Formula"),
                    nombre=data_formula["nombre"],
                    codigo_latex=data_formula["codigo_latex"],
                    creada=1,
                    eliminada=0
                )
                db.session.add(formula)
                db.session.commit()
                Cache.active = True
                return redirect(url_for("views.add_image", id_formula=formula.id))
            else:
                raise Exception("can't POST data without title")
        except Exception as ex:
            return render_template(
                'myte/404.html',
                title="Internal error",
                description="failed at stage 2",
                trace=traceback.format_exc()
            )


@views.route('/home/images/add/<id_formula>', methods=["POST", "GET"])
@login_required
def add_image(id_formula):
    mysql_cursor = mysql.get_db().cursor()
    if not current_user.is_premium():
        flash("Update to premium role to use images", category="warning")
        return redirect(url_for("views.home"))

    formula = Formula.query.get(int(id_formula))
    if request.method == "GET":
        return render_template("myte/add_images.html", formula=formula)
    post_data = request.form

    if "return_home" in post_data:
        if Cache.active:  # is creating a formula from scratch
            flash("Formulada creada exitosamente!", category="success")
        return redirect(url_for("views.home"))

    if "completed" in post_data:
        uploaded_files = request.files.getlist("img")
        if len(uploaded_files) > MAX_FILES:
            flash("Se permiten máximo %d archivos" %
                  MAX_FILES, category="error")
            return render_template("myte/add_images.html", formula=formula)

        if uploaded_files:
            id = utils.get_id(mysql_cursor, "imagen")
            for file in uploaded_files:
                filename = secure_filename(file.filename)
                # Path to images
                path = os.path.join(
                    Config.UPLOAD_FOLDER, "formulas", id_formula)
                if not os.path.exists(path):
                    os.makedirs(path)
                path = os.path.join(path, filename)
                file.save(path)
                img = Imagen(
                    id=id,
                    id_formula=id_formula,
                    path=path
                )
                id += 1
                db.session.add(img)
                db.session.commit()

            flash(f"Se agregaron {len(uploaded_files)} imagen(es) exitosamente!",
                  category="success")

            if Cache.active:
                return redirect(url_for("views.add_script", id_formula=id_formula))

        Cache.active = False
        return redirect(url_for("views.home"))

    return render_template("myte/add_images.html", formula=formula)


@views.route('/home/script/add/<id_formula>', methods=["POST", "GET"])
@login_required
def add_script(id_formula):
    mysql_cursor = mysql.get_db().cursor()
    if not current_user.is_premium():
        flash("Update to premium role to use scripts", category="warning")
        return redirect(url_for("views.home"))

    formula = Formula.query.get(int(id_formula))
    if request.method == "GET":
        return render_template("myte/add_script.html", formula=formula)

    post_data = request.form

    if "return_home" in post_data:
        Cache.active = False
        return redirect(url_for("views.home"))

    # Ajuste de script
    script_body = post_data['script']
    script_vars = post_data['variables']

    sanitized_script = sanitize_script(script_body, script_vars)

    if sanitized_script is None:
        flash("Invalid Script!, remember to only use math related code",
              category="warning")
        return render_template("myte/add_script.html", formula=formula)

    script_body, script_vars = sanitized_script

    # Agregar script a base de datos

    id_script = utils.get_id(mysql_cursor, "script")
    content = script_body
    variables = script_vars

    script = Script(
        id=id_script,
        id_formula=id_formula,
        contenido=content,
        variables_script=variables
    )

    db.session.add(script)
    db.session.commit()

    if Cache.active:  # is creating a formula from scratch
        flash("Formulada creada exitosamente!", category="success")

    return redirect(url_for("views.home"))


@views.route('/home/delete', methods=["POST", "GET"], defaults={"id_formula": None})
@views.route('/home/delete/<id_formula>', methods=["POST", "GET"])
@login_required
def formula_script(id_formula):
    formula = Formula.query.get(int(id_formula))
    variables = formula.script.variables_script
    if request.method == "GET":
        return render_template("myte/run_script.html", formula=formula, variables=variables)
    if "return_home" in request.form:
        return redirect(url_for("views.home"))
    post_data = request.form
    input_vars = post_data["input_vars"]
    result = formula.script.run_script(input_vars)
    return render_template("myte/run_script.html", formula=formula, variables=variables, result=result)


@views.route('/home/delete', methods=["POST", "GET"], defaults={"id_formula": None})
@views.route('/home/delete/<id_formula>', methods=["POST", "GET"])
@login_required
def delete_formula(id_formula):
    return render_template("myte/delete.html")


@views.route('/home/edit/<id_formula>', methods=["POST", "GET"])
@login_required
def edit_formula(id_formula):
    if "return_home" in request.form:
        return redirect(url_for("views.home"))
    
    formula = Formula.query.get(int(id_formula))
    images = []
    for image in formula.imagen:
        name = os.path.basename(image.path)
        images.append({
            "nombre": name,
            "path": utils.format_path(image.path)
        })

    return render_template("myte/edit.html", formula=formula, images=images)


@views.route('/home/formulas')
@login_required
def formulas():
    data = get_formulas_by_user(current_user.id)
    return render_template("myte/formulas.html", data=data)


@views.route('/home/images/<id_formula>', methods=["POST", "GET"])
@login_required
def formula_images(id_formula):
    if "return_home" in request.form:
        return redirect(url_for("views.home"))
    formula = Formula.query.get(int(id_formula))
    images = []
    for image in formula.imagen:
        name = os.path.basename(image.path)
        images.append({
            "nombre": name,
            "path": utils.format_path(image.path)
        })
    return render_template("myte/images.html", formula=formula, images=images)


def load_formulas(cant_max=20):
    mysql_cursor = mysql.get_db().cursor()
    memo_id = set()

    mysql_cursor.execute("""
        SELECT id_formula FROM indice WHERE id_usuario = %s ORDER BY numero_usos DESC LIMIT %s
    """, (current_user.id, cant_max))
    formulas = []
    raw_result = mysql_cursor.fetchall()
    if raw_result:
        for record in raw_result:
            id = int(record[0])
            if id in memo_id:
                continue
            memo_id.add(id)
            formula = Formula.query.get(id)
            latex = formula.codigo_latex
            if r"\n" in latex:
                latex = utils.format_newline(formula.codigo_latex)
            tags = lookup_tags(id)
            if tags:
                tags = utils.format_tags(tags)
            formulas.append(
                {
                    "id": id,
                    "nombre": formula.nombre,
                    "codigo_latex": latex,
                    "tags": tags,
                    "images": formula.imagen,
                    "script": formula.script
                }
            )

    if len(formulas) < cant_max:  # fill rest
        print('Agregando formulas . . .')
        formulas = more_formulas(formulas, memo_id, cant_max)

    print(f"Se encontraron las sig. formulas:")
    if formulas:
        [print(formula) for formula in formulas]
    return formulas


@views.route('/home/premium')
@login_required
def premium_account():

    return render_template("myte/premium.html")


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
        SELECT f.id_formula FROM Historial as h, Formula as f
        WHERE h.id_usuario = %s AND f.eliminada = 0 AND f.id_formula = h.id_formula
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


def sanitize_script(script_body, script_vars):

    script_vars = script_vars.replace(' ', '')

    processed_vars = script_vars.split(',')

    for var in processed_vars:
        if var[0].isnumeric():
            print('variable no permitida en script!')
            return None

    # script_dict = {var.split('=')[0] : var.split('=')[1] for var in script_vars}
    # var_dict = {}

    # for element in script_vars:

    #     elements = element.split('=')
    #     var_dict[elements[0]] = elements[1]

    blacklisted_code = ['os.', 'system.', '__', '\\']
    for element in blacklisted_code:

        if element in script_body:
            print('Elemento no permitido en script!')
            return None

    return (script_body, script_vars)


def get_formulas_by_user(user_id):
    cur = mysql.get_db().cursor()
    cur.execute("""
        SELECT cat.nombre, user_formulas.id_formula FROM 
        (SELECT fo.id_formula FROM Historial AS hi, Formula AS fo
        WHERE hi.id_usuario = %s AND fo.id_formula = hi.id_formula
        AND fo.eliminada = 0) AS user_formulas 
        INNER JOIN CategoriaFormula AS cf ON cf.id_formula = user_formulas.id_formula
        INNER JOIN Categoria AS cat ON cat.id_categoria = cf.id_categoria
    """, (user_id))
    raw_result = cur.fetchall()
    print(raw_result)
    it = 0
    cat_dict = {}
    for category, id_formula in raw_result:
        cat_dict.setdefault(category, [])
        cat_dict[category].append(id_formula)

    for category, id_formulas in cat_dict.items():
        for index, id in enumerate(id_formulas):
            formula = Formula.query.get(int(id))
            latex = formula.codigo_latex
            if r"\n" in latex:
                latex = utils.format_newline(latex)
            tags = lookup_tags(int(id))
            if tags:
                tags = utils.format_tags(tags)
            cat_dict[category][index] = {
                "id": int(id),
                "nombre": formula.nombre,
                "codigo_latex": latex,
                "tags": tags,
                "images": formula.imagen,
                "script": formula.script
            }
    print(cat_dict)
    return cat_dict

# IDS = [4, 11, 17]
#     formulas = []
#     for id in IDS:
#         cur.execute("""
#             SELECT id_formula FROM CategoriaFormula
#             WHERE id_categoria = %s
#         """, id)
#         raw_result = cur.fetchall()
#         if not raw_result:
#             continue
#         for record in raw_result:
#             id = int(record[0])
#             formulas.append(
#                 Formula.query.get(id)
#             )


def get_default_formulas():
    cur = mysql.get_db().cursor()
    cur.execute("""
        SELECT
        c.nombre
        f.id_formula
        FROM 
        categoria as c,
        formula as f,
        categoriaformula as cf
        WHERE
        cf.id_formula = f.id_formula
        AND cf.id_categoria = c.id_categoria
        AND f.creada = 0
        AND f.eliminada = 0
    """)
    raw_result = cur.fetchall()
    print(raw_result)
    it = 0
    cat_dict = {}
    for category, id_formula in raw_result:
        cat_dict.setdefault(category, [])
        cat_dict[category].append(id_formula)

    for category, id_formulas in cat_dict.items():
        for index, id in enumerate(id_formulas):
            formula = Formula.query.get(int(id))
            latex = formula.codigo_latex
            if r"\n" in latex:
                latex = utils.format_newline(latex)
            tags = lookup_tags(int(id))
            if tags:
                tags = utils.format_tags(tags)
            cat_dict[category][index] = {
                "id": int(id),
                "nombre": formula.nombre,
                "codigo_latex": latex,
                "tags": tags,
                "images": formula.imagen,
                "script": formula.script
            }
    print(cat_dict)
    return cat_dict
