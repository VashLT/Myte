from django.shortcuts import render, HttpResponse

from django.contrib.auth.decorators import login_required

from django.conf import settings


def index(request):  # temporary
    return HttpResponse("<h1> Formulas view </h1>")


@login_required(redirect_field_name=settings.REDIRECT_FIELD_NAME)
def liveupdate(request):
    """
        Asynchronously updates Index table every time user  click on a formula
    """
    return HttpResponse("<h1> Ajax updater </h1>")


@login_required(redirect_field_name=settings.REDIRECT_FIELD_NAME)
def add(request):
    """
        Stage-based process where user input latex code (and also render),
        formula title, add images and script if has premium credentials.
    """
    return HttpResponse("<h1> Add formula </h1>")


@login_required(redirect_field_name=settings.REDIRECT_FIELD_NAME)
def edit(request):
    """
        Allows editing latex code, title, images and scripts of a formula
    """
    return HttpResponse("<h1> Edit formula </h1>")


@login_required(redirect_field_name=settings.REDIRECT_FIELD_NAME)
def delete(request):
    """
        Delete formulas, does not render a template but commit database
    """
    return HttpResponse("<h1> Delete formula </h1>")


@login_required(redirect_field_name=settings.REDIRECT_FIELD_NAME)
def add_image(request):
    """
        User upload (max 3) images that are related to their formulas
    """
    return HttpResponse("<h1> Add image </h1>")


@login_required(redirect_field_name=settings.REDIRECT_FIELD_NAME)
def add_script(request):
    """
        User writes valid Python code to evaluate their formulas
    """
    return HttpResponse("<h1> Add script </h1>")


@login_required(redirect_field_name=settings.REDIRECT_FIELD_NAME)
def script(request):
    """
        Run Python code to compute formulas based on given arguments
    """
    return HttpResponse("<h1> Run script </h1>")
