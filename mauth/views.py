from django.shortcuts import render, redirect

from django.contrib import messages #flashing

from .models import User, MetaUser, Rol

# Create your views here.


def login(request):
    if request.method == "POST":
        details = request.form
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
    return render(request, 'mauth/register.html')
