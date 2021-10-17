from django.shortcuts import redirect
from django.contrib import messages  # flashing

from django.conf import settings


def ajax_required(view):
    def wrapper(request, *args, **kwargs):
        if not request.is_ajax and request.POST:
            messages.warning(
                request, "Only open to AJAX requests")
            return redirect('main:home')
        else:
            return view(request, *args, **kwargs)
    return wrapper
