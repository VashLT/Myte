from django.shortcuts import redirect, reverse

from django.http import HttpResponseRedirect


from django.contrib import messages  # flashing


def premium_required(view, redirect_to=None):
    def wrapper(request, *args, **kwargs):
        if not request.user.is_premium:
            messages.warning(
                request, "Para acceder a este sitio debes ser un usuario premium")
            if redirect_to:
                return redirect(redirect_to)
            return redirect('main:home')
        else:
            return view(request, *args, **kwargs)
    return wrapper


def unauthenticated_user(view):
    def wrapper(request, *args, **kwargs):
        if request.user.is_authenticated:
            messages.warning(
                request, "Debes cerrar sesión primero para acceder a este sitio")
            return redirect('main:home')
        else:
            return view(request, *args, **kwargs)
    return wrapper
