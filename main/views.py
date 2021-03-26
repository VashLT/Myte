from django.shortcuts import render, redirect

from django.contrib.auth.decorators import login_required

from django.contrib import messages

from django.conf import settings

from main.decorators import normal_user_required

from main.forms import UpgradeForm

from formulas.utils import load_formulas

from mauth.models import Rol


def index(request):
    return render(request, "main/index.html")


@login_required(redirect_field_name=settings.REDIRECT_FIELD_NAME)
def home(request):
    user = request.user
    formulas = load_formulas(user)
    print("loaded following formulas")
    for formula in formulas:
        print(formula)

    if formulas:
        messages.info(request, "Succesfully loaded %d formulas" %
                      len(formulas))
    context = {"user": user, "formulas": formulas}
    return render(request, "main/home.html", context)


@login_required(redirect_field_name=settings.REDIRECT_FIELD_NAME)
@normal_user_required
def premium(request):
    if request.method == "GET":
        return render(request, "main/premium.html", {"form": UpgradeForm()})
    form = UpgradeForm(request.POST)
    user = request.user
    if user.rol.id == settings.ADMIN_ROL:
        messages.info(request, "%s tiene el máximo rango" %
                      user.get_username())

    user.rol = Rol.objects.get(pk=3)  # admin rol
    user.save()
    messages.success(request, "%s es ahora un usuario premium!" %
                     user.get_username())
    return redirect("main:home")
