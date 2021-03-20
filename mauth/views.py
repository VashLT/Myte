# Debugging
import traceback

from django.shortcuts import render, redirect, reverse, HttpResponse

from django.contrib import messages  # flashing

from django.core.validators import validate_email

from django.core.exceptions import ValidationError

from .models import User, MetaUser, Rol

from .forms import RegisterForm

from . import utils

DEFAULT_ROL = 1


class Cache(object):
    """ store inputted data at register stage 
        main keys:
            - user: dict containing user data based on User model
            - meta: dict containing meta user data based on MetaUser model
            - valid_request: latest user request that is valid for RegisterForm
    """
    register = {}


def login(request):
    if request.method == "POST":
        print(request.POST)
        details = request.POST
        name = details["username"]
        pw = details["password"]

        meta = MetaUser.objects.get(pk=name)
        if meta:
            messages.success("Succesfully logged in")
            login_user(meta.usuario, remember=True)
            mysql_cursor.execute("""
                UPDATE MyteVar SET valor = %s WHERE nombre = "current_user"
            """, (meta.usuario.id))
            mysql.get_db().commit()
            return redirect(url_for('views.home'))
        else:
            messages.error("Nombre de usuario o contraseña incorrectos")

    return render(request, 'mauth/login.html')


def register(request, stage=1):
    cache_user = None
    clean_data = {}
    print(f"[STAGE {stage}] printing POST data: {request.POST.dict()}")
    if stage == 1:
        if request.method == "GET":
            if "valid_request" in Cache.register:
                form = RegisterForm(Cache.register["valid_request"])
            else:
                form = RegisterForm()
        else:
            print("validating POST ...")
            form = RegisterForm(request.POST)
            if user(request):
                messages.info(request, "Valid first stage")
                Cache.register["valid_request"] = request.POST.dict()
                utils.populate_cache(
                    request.POST,
                    Cache.register,
                    {
                        "user":
                        {
                            "username": "nombre_usuario",
                            "fullname": ["nombre", utils.format_name],
                            "email": "email",
                            "birthdate": "fecha_nacimiento",
                        },
                        "meta": {
                            "username": "nombre_usuario",
                            "pw1": ["clave_encriptada", utils.encrypt]
                        }
                    }
                )
                return redirect(reverse('mauth:register', args=(2,)))
    elif stage == 2:
        if request.method == "GET":
            if not "user" in Cache.register:
                return redirect(reverse(
                    'mauth:register',
                    args=(1,))
                )
        else:
            data = request.POST
            if "back" in data:
                return redirect(reverse(
                    'mauth:register',
                    args=(1,))
                )
            elif extra_info(request) and "finish" in data:
                messages.info(request, "Valid second stage")
                Cache.register["carrera"] = data["career"]
                Cache.register["niveleducativo"] = data["level"]
                Cache.register["valid_request"].update(request.POST.dict())

                return redirect(reverse('mauth:register', args=(3,)))

        form = RegisterForm(Cache.register["valid_request"])

    elif stage == 3:
        if not "valid_request" in Cache.register:
            return redirect(reverse('mauth:register', args=(1,)))
        Cache.register = {}
        return HttpResponse("<h1>Nice UwU</h1>")
    else:
        raise Exception("Invalid stage")
    context = {
        "form": form,
        "stage": stage,
        "cache": Cache.register
    }
    return render(request, 'mauth/register.html', context)


def validate(func):
    def wrapper(request):
        logs = func(request.POST)
        print(f"logs: {logs}")
        for log in logs:
            messages.error(request, log)
        if not logs:
            return True
    return wrapper


@validate
def user(data):
    """
        validate user data to create user
    """
    logs = []
    if data["pw1"] != data["pw2"]:
        logs.append("Passwords must be the same!")
    if not utils.validate_username(MetaUser, data['username']):
        logs.append("Username already exists")
    if not utils.is_email(data['email']):
        logs.append("Not a valid email")
    return logs


@validate
def extra_info(data):
    """
        validate career and educational level data
    """
    logs = []
    if data["level"] == 'select':
        logs.append("Seleccione un nivel educativo")
    if data["career"] == "select":
        logs.append("Seleccione una carrera")
    return logs
