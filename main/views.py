from django.shortcuts import render
from django.contrib.auth.decorators import login_required

from django.conf import settings


def index(request):
    return render(request, "main/index.html")


@login_required(redirect_field_name=settings.REDIRECT_FIELD_NAME)
def home(request):
    user = request.user
    formulas = None
    context = {"user": user, "formulas": formulas}
    return render(request, "main/home.html", context)
