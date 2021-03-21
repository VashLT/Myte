from django.shortcuts import redirect
from django.contrib import messages  # flashing


def unauthenticated_user(view):
    def wrapper(request, *args, **kwargs):
        if request.user.is_authenticated:
            messages.warning(
                request, "Debes cerrar sesión primero para acceder a este sitio")
            return redirect('main:home')
        else:
            return view(request, *args, **kwargs)
    return wrapper
