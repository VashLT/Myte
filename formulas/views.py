import traceback

from django.shortcuts import render, HttpResponse, reverse, redirect

from django.http import JsonResponse

from django.contrib.auth.decorators import login_required

from django.contrib import messages

from django.conf import settings

from .models import Formula, Indice, Imagen, Script, Historial, Tag

from .forms import AddFormulaForm

from .decorators import ajax_required

from . import utils

from mauth.decorators import premium_required

from myte.shortcuts import home


class Cache(object):
    """ store inputted data at register stage
        main keys:
            - user: dict containing user data based on User model
            - meta: dict containing meta user data based on MetaUser model
            - valid_request: latest user request that is valid for RegisterForm
    """
    add = {}


def index(request):  # temporary
    return HttpResponse("<h1> Formulas view </h1>")


@login_required(redirect_field_name=settings.REDIRECT_FIELD_NAME)
@ajax_required
def liveupdate(request):
    """
        Asynchronously updates Index table every time user  click on a formula
    """
    response = ""
    print(f"AJAX Request POST: {request.POST}")
    id = int(request.POST["id_formula"])
    try:
        index = Indice.objects.get(id_formula=id, id_usuario=request.user.id)
        index.n_clicks += 1
        index.save()
        response = "Updated %d!" % id

    except index.DoesNotExist:
        assert Formula.objects.filter(pk=id).exists()
        Indice.objects.create(
            id_formula=id, id_usuario=request.user.id, n_clicks=1)
        response = "Created %d!" % id

    finally:
        return JsonResponse({"message": response}, status=200)


@login_required(redirect_field_name=settings.REDIRECT_FIELD_NAME)
def add(request, stage=1):
    """
        Stage-based process where user input latex code (and also render),
        formula title, add images and script if has premium credentials.
    """
    print(
        f"GET: {request.GET}\nPOST: {request.POST}\n[stage]: {stage}\nCache: {Cache.add}")
    user = request.user
    form = AddFormulaForm(request.POST)
    context = {"user": user, "stage": stage, "form": form}
    if stage == 1:
        if request.method == "GET":
            print(context)
            if "formula" in Cache.add and Cache.add["formula"]:
                context["formula"] = Cache.add["formula"]["instance"]
            return render(request, "formulas/add.html", context)

        formula = Formula(codigo_latex=request.POST["codigo_latex"])

        Cache.add.setdefault("formula", {"instance": formula})

        context["formula"] = formula

        if "render" in request.POST:
            context["stage"] = 1
            return render(request, "formulas/add.html", context)

        return redirect(reverse('formulas:add', args=(2,)))

    elif stage == 2:
        if request.method == "GET":
            if not ("formula" in Cache.add and Cache.add["formula"]):
                return redirect(reverse('formulas:add', args=(1,)))
            context["formula"] = Cache.add["formula"]["instance"]
            return render(request, "formulas/add.html", context)

        if "back" in request.POST:
            return redirect(reverse('formulas:add', args=(1,)))

        formula = Cache.add["formula"]["instance"]
        formula.nombre = request.POST["nombre"]
        request.POST["codigo_latex"] = formula.codigo_latex

        print(f"modified POST: {request.POST}")

        if not AddFormulaForm(request.POST).is_valid():
            print("Form is not valid")
            return redirect(reverse('formulas:add', args=(1,)))

        Historial.objects.create(id_usuario=user.id, id_formula=formula.id)
        formula.save()

        print(f"Created {formula}, succesfully associated to user")

        if not user.is_premium:
            messages.success(request, "Formula agregada exitosamente!")
            Cache.add = {}
            return home()

        return redirect(reverse('formulas:add_image', args=(formula.id,)))

    elif stage == 3:
        if not user.is_premium:
            messages.warning(
                request, "Para acceder a este sitio tienes que ser usuario premium")
            return home()
        if not ("formula" in Cache.add and Cache.add["formula"]):
            return redirect(reverse('formulas:add', args=(1,)))

        id_formula = Cache.add["formula"]["instance"].id
        return redirect(reverse('formulas:add_script', args=(id_formula)))

    else:
        context = {
            "title": "Internal error",
            "description": f"Stage in add formula process was not found. [stage={stage}]",
            "trace": traceback.format_exc()
        }
        return render(request, "main/404.html", context)


@login_required(redirect_field_name=settings.REDIRECT_FIELD_NAME)
def edit(request, id_formula):
    """
        Allows editing latex code, title, images and scripts of a formula
    """
    return HttpResponse("<h1> Edit formula </h1>")


@login_required(redirect_field_name=settings.REDIRECT_FIELD_NAME)
def delete(request, id_formula):
    """
        Delete formulas, does not render a template but commit database
    """
    return HttpResponse("<h1> Delete formula </h1>")


@login_required(redirect_field_name=settings.REDIRECT_FIELD_NAME)
@premium_required
def add_image(request, id_formula):
    """
        User upload (max 3) images that are related to their formulas
    """
    try:
        formula = Formula.objects.get(pk=id_formula)
        context = {"formula": formula}
        if request.method == "GET":
            return render(request, "formulas/add_image.html", context)

        if "to-home" in request.POST or not "finish" in request.POST:
            if "formula" in Cache.add and Cache.add["formula"]:
                messages.success(request, "Formulada creada exitosamente!")
            Cache.add = {}
            return home()

        files = request.FILES
        if files:
            Cache.add["images"] = []
            for file in files:
                try:
                    print(f"processing {file.name} ...")
                    store_path = utils.store_file(file)
                    image = Imagen(id_formula=formula.id, path=store_path)
                    Cache.add["images"].append(image)
                except Exception:
                    Cache.add["images"] = []
                    traceback.print_exc()

            [im.save() for im in Cache.add["images"]]
            Cache.add["images"] = []
            messages.success(
                request, f"Se agrearon {len(files)} imagenes exitosamente!")

        if "formula" in Cache.add and Cache.add["formula"]:
            # go to stage 3 in add formula view
            return redirect(reverse('formulas:add', args=(3,)))

        return home()

    except Formula.DoesNotExist:
        context = {
            "title": "Internal error",
            "description": f"Formula with id = {id_formula} does not exist",
            "trace": traceback.format_exc()
        }
        return render(request, "main/404.html", context)


@login_required(redirect_field_name=settings.REDIRECT_FIELD_NAME)
def add_script(request, id_formula):
    """
        User writes valid Python code to evaluate their formulas
    """
    return HttpResponse("<h1> Add script </h1>")


@login_required(redirect_field_name=settings.REDIRECT_FIELD_NAME)
def script(request, id_formula):
    """
        Run Python code to compute formulas based on given arguments
    """
    return HttpResponse("<h1> Run script </h1>")
