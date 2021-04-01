# Debugging
import traceback

from django.shortcuts import render, redirect, reverse, HttpResponse

from django.contrib import messages  # flashing

from django.core.validators import validate_email

from django.core.exceptions import ValidationError

from django.contrib.auth.decorators import login_required


from django.contrib.auth import (
    authenticate,
    login as login_user,
    logout as logout_user
)

from .models import User, MetaUser, Rol
from .forms import RegisterForm, LoginForm
from .decorators import unauthenticated_user
from . import utils

from main.models import Mytevar

from django.conf import settings

from myte.constants import DEFAULT_ROL

class Cache(object):
    """ store inputted data at register stage
        main keys:
            - user: dict containing user data based on User model
            - meta: dict containing meta user data based on MetaUser model
            - valid_request: latest user request that is valid for RegisterForm
    """
    register = {}


@unauthenticated_user
def login(request):
    print(f"GET: {request.GET}\nPOST: {request.POST}")
    if request.method == "GET":
        form = LoginForm()
        return render(request, 'mauth/login.html', {"form": form})
    form = LoginForm(request.POST)
    if form.is_valid():
        user = authenticate(
            request=request,
            **form.cleaned_data
        )
        if not user:
            messages.error(
                request, "Nombre de usuario o contraseña incorrectos")
        else:
            print("user authenticated, login user ...")
            login_user(request, user)  # django login function
            user_var = Mytevar.objects.get(nombre="current_user")
            user_var.valor = user.id
            user.update_last_login()

            user.save()
            user_var.save()
            if settings.REDIRECT_FIELD_NAME in request.POST:
                return redirect(request.POST.get(settings.REDIRECT_FIELD_NAME))
            return redirect('main:home')

    return render(request, 'mauth/login.html', {"form": form})


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

            return render(request, 'mauth/register.html', context)

        if "back" in request.POST:
            return redirect("main:index")

        print("validating POST ...")
        context["form"] = RegisterForm(request.POST)

        if valid_user(request):
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
            context["form"] = RegisterForm(Cache.register["valid_request"])
            return render(request, 'mauth/register.html', context)

        if "back" in request.POST:
            return redirect(reverse(
                'mauth:register',
                args=(1,))
            )

        if not valid_extra_info(request):
            return redirect(reverse('mauth:register', args=(2,)))

        Cache.register["carrera"] = request.POST["career"]
        Cache.register["niveleducativo"] = request.POST["level"]
        Cache.register["valid_request"].update(request.POST.dict())

        return redirect(reverse('mauth:register', args=(3,)))

    elif stage == 3:
        if not "valid_request" in Cache.register:
            return redirect(reverse('mauth:register', args=(1,)))

        print(f"Final cache:\n{Cache.register}")
        user_credentials = Cache.register["user"]

        meta = MetaUser.objects.create(**Cache.register["meta"])

        user_credentials["rol"] = Rol.objects.get(pk=DEFAULT_ROL)
        user_credentials["meta"] = meta

        new_user = User.objects.create(**user_credentials)

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
        Cache.register = {}  # clean cache

        login_user(request, user)
        print(f"User logged in!, {request.user}")
        messages.success(request, "Welcome %s" % meta.nombre_usuario)

        return redirect("main:home")

    else:
        context = {
            "title": "Internal error",
            "description": f"Stage in register process was not found. [stage={stage}]",
            "trace": traceback.format_exc()
        }
        return render(request, "main/404.html", context)


def logout(request):
    logout_user(request)
    messages.success(request, "Sesión cerrada correctamente")
    return redirect("main:index")


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
