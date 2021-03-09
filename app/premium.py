from flask import Blueprint, render_template, flash, request, redirect, url_for

from flask_login import login_required, current_user

from .models import Usuario, MetaUsuario, Rol, Tag, TagFormula, Imagen, Formula, Historial
from . import db, mysql
from . import utils

import random


views = Blueprint("views", __name__)

@views.route('/home/premium')
def enhance_account():

    return render_template('myte/premium.html')