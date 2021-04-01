from django.shortcuts import redirect

from django.contrib import messages  # flashing

from myte.constants import PREMIUM_ROL


def normal_user_required(view):
    def wrapper(request, *args, **kwargs):
        if request.user.rol.id == PREMIUM_ROL:
            messages.warning(
                request, "Usuarios premium no pueden acceder a este sitio")
            return redirect('main:home')
        else:
            return view(request, *args, **kwargs)
    return wrapper
