from django.shortcuts import render, redirect

from django.contrib import messages  # flashing

from .models import User, MetaUser, Rol
from .forms import DateForm

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
    df = DateForm()
    if request.method == "POST":
        print(request.POST)
    context = {
        "date_form": df
    }
    return render(request, 'mauth/register.html', context)
