from django.test import TestCase

from django.shortcuts import render, redirect

from django.core.files.storage import FileSystemStorage

from django.contrib.auth import (
    authenticate,
    login,
    logout
)

from formulas.models import Formula, Imagen

import formulas.utils as f_utils


def test(request):
    user = log_user(request)
    formulas = f_utils.load_formulas(user)
    context = {"user": user, "formulas": formulas}
    
    return render(request, "main/test.html", context)


def log_user(request):
    user = authenticate(request, username="pepe1", password="hola")
    login(request, user)
    return user
