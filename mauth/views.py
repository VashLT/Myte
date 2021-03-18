from django.shortcuts import render, redirect

from django.contrib import messages  # flashing

from django.core.validators import validate_email

from django.core.exceptions import ValidationError

from .models import User, MetaUser, Rol
from .forms import RegisterForm
from . import utils

# Create your views here.


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


def register(request):
    print(User.objects.all())
    if request.method == "GET":
        form = RegisterForm()
    else:
        form = RegisterForm(request.POST)
        if validate_user(request) and form.is_valid():
            messages.info(request, "Valid register form")

    return render(request, 'mauth/register.html', {"form": form})


def validate_user(request):
    """
        validate user data to create user
    """
    data = request.POST
    state = True

    if data["pw1"] != data["pw2"]:
        messages.error(request, "Passwords must be the same!")
        state = False
    if not utils.validate_username(MetaUser, data['username']):
        messages.error(request, "Username already exists")
        state = False
    if not utils.is_email(data['email']):
        messages.error(request, "Not a valid email")
        state = False
    return state
