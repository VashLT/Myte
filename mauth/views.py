# Debugging
import traceback

from django.shortcuts import render, redirect, reverse, HttpResponse

from django.contrib import messages  # flashing

from django.core.validators import validate_email

from django.core.exceptions import ValidationError

from django.contrib.auth import (
    authenticate,
    login as login_user,
    logout as logout_user
)

from mauth.models import User, MetaUser, Rol
from mauth.forms import RegisterForm
from mauth.decorators import unauthenticated_user
from mauth import utils

from main.models import Mytevar

from django.conf import settings


DEFAULT_ROL = 1


class Cache(object):
    """ store inputted data at register stage 
        main keys:
            - user: dict containing user data based on User model
            - meta: dict containing meta user data based on MetaUser model
            - valid_request: latest user request that is valid for RegisterForm
    """
    register = {}


@unauthenticated_user
def login(request, test=None):
    print(test)
    print(f"login request\n[GET]:{request.GET}\n[POST]:{request.POST}")
    if request.method == "GET":
        return render(request, 'mauth/login.html')
    user = authenticate(
        username=request.POST['username'],
        password=request.POST['password']
    )
    if not user:
        messages.error(request, "Nombre de usuario o contraseña incorrectos")

    else:
        print("user authenticated, login user ...")
        login_user(request, user)  # django login function
        user_var = Mytevar.objects.get(nombre="current_user")
        user_var.valor = user.id
        user.update_last_login()
        user.save()
        user_var.save()
        print(settings.REDIRECT_FIELD_NAME)
        if settings.REDIRECT_FIELD_NAME in request.POST:
            return redirect(request.POST.get(settings.REDIRECT_FIELD_NAME))
        return redirect(reverse('views.home', args=(user,)))

    return render(request, 'mauth/login.html')


@unauthenticated_user
def register(request, stage=1):
    context = {"stage": stage}
    print(f"[STAGE {stage}] printing POST data: {request.POST.dict()}")
    if stage == 1:
        if request.method == "GET":
            if "valid_request" in Cache.register:
                context["form"] = RegisterForm(Cache.register["valid_request"])
            else:
                context["form"] = RegisterForm()
        else:
            print("validating POST ...")
            context["form"] = RegisterForm(request.POST)
            if valid_user(request):
                messages.info(request, "Valid first stage")
                Cache.register["valid_request"] = request.POST.dict()
                utils.populate_cache(
                    request.POST,
                    Cache.register,
                    {
                        "user":
                        {
                            "username": "meta",
                            "fullname": ["nombre", utils.format_name],
                            "email": "email",
                            "birthdate": ["fecha_nacimiento", utils.format_date],
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
            elif valid_extra_info(request) and "finish" in data:
                messages.info(request, "Valid second stage")
                Cache.register["carrera"] = data["career"]
                Cache.register["niveleducativo"] = data["level"]
                Cache.register["valid_request"].update(request.POST.dict())

                return redirect(reverse('mauth:register', args=(3,)))

        context["form"] = RegisterForm(Cache.register["valid_request"])

    elif stage == 3:
        if not "valid_request" in Cache.register:
            return redirect(reverse('mauth:register', args=(1,)))
        print(Cache.register)
        user_credentials = Cache.register["user"]
        meta = MetaUser(**Cache.register["meta"])

        user_credentials["rol"] = Rol.objects.get(pk=DEFAULT_ROL)
        user_credentials["meta"] = meta
        new_user = User(**user_credentials)

        meta.save()
        new_user.save()

        user = authenticate(
            request=request,
            username=meta.nombre_usuario,
            password=Cache.register["valid_request"]["pw2"]
        )
        if not user:
            print(Cache.register["valid_request"])
            raise Exception(
                "something went wrong when authenticating the new User")

        formulas = None
        Cache.register = {}
        print(type(user))
        login_user(request, user)
        print("User logged in!")
        messages.success(request, "Welcome %s" % meta.nombre_usuario)
        print("redirecting to home")
        print(redirect("main:home"))

        return redirect(reverse("main:home"))
    else:
        raise Exception("Invalid stage")
    return render(request, 'mauth/register.html', context)


def logout(request):
    logout_user(request)
    messages.success(request, "Sesión cerrada correctamente")
    return redirect("")


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
def valid_user(data):
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
def valid_extra_info(data):
    """
        validate career and educational level data
    """
    logs = []
    if data["level"] == 'select':
        logs.append("Seleccione un nivel educativo")
    if data["career"] == "select":
        logs.append("Seleccione una carrera")
    return logs
