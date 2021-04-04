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

from myte.shortcuts import home, error_page

from myte.constants import MAX_IMAGES


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

    except Indice.DoesNotExist:
        assert Formula.objects.filter(pk=id).exists()
        formula = Formula.objects.get(pk=id)

        Indice.objects.create(
            id_formula=formula, id_usuario=request.user, n_clicks=1)
        response = "Created %d!" % id

    finally:
        print(response)
        return JsonResponse({"response": response}, status=200)


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
    add_formula_is_active = "formula" in Cache.add and Cache.add["formula"]
    if stage == 1:
        if request.method == "GET":
            if add_formula_is_active:
                context["formula"] = Cache.add["formula"]["instance"]

            return render(request, "formulas/add.html", context)

        latex = request.POST["codigo_latex"]

        formula = Formula(codigo_latex=latex)
        Cache.add['formula'] = {
            'codigo_latex': latex,
            'instance': formula
        }

        context["formula"] = formula

        if "render" in request.POST:
            context["stage"] = 1
            return render(request, "formulas/add.html", context)

        return redirect(reverse('formulas:add', args=(2,)))

    elif stage == 2:
        if request.method == "GET":
            if not add_formula_is_active:
                return redirect(reverse('formulas:add', args=(1,)))

            context["formula"] = Cache.add["formula"]["instance"]

            return render(request, "formulas/add.html", context)

        if "back" in request.POST:
            return redirect(reverse('formulas:add', args=(1,)))

        formula = Cache.add["formula"]["instance"]
        formula.nombre = Cache.add["formula"]["nombre"] = request.POST["nombre"]

        print(Cache.add["formula"])

        valid_form = AddFormulaForm(Cache.add["formula"]).is_valid()

        if not valid_form:

            messages.error(
                request, "Codigo latex o titulo de la formula invalidos")
            return redirect(reverse('formulas:add', args=(1,)))

        formula.save()
        Historial.objects.create(id_usuario=user, id_formula=formula)

        print(f"Created {formula}, succesfully associated to user")

        if not user.is_premium:  # non-premium user only can reach stage 2
            messages.success(request, "Formula agregada exitosamente!")
            Cache.add = {}
            return home()

        return redirect(reverse('formulas:add_image', args=(formula.id,)))

    elif stage == 3:
        if not user.is_premium:
            messages.warning(
                request, "Para acceder a este sitio tienes que ser usuario premium")
            return home()
        if not add_formula_is_active:
            return redirect(reverse('formulas:add', args=(1,)))

        id_formula = Cache.add["formula"]["instance"].id
        print(f"add formula stage 3, formula with id: {id_formula}")
        return redirect(reverse('formulas:add_script', args=(id_formula,)))

    else:
        return error_page(
            request,
            title="Internal error",
            description=f"Stage in add formula process was not found. [stage={stage}]"
        )


@login_required(redirect_field_name=settings.REDIRECT_FIELD_NAME)
def edit(request, id_formula):
    """
        Allows editing latex code, title, images and scripts of a formula
    """
    try:
        formula = Formula.objects.get(pk=id_formula)
    except Formula.DoesNotExist:
        return error_page(
            request,
            title="Formula Does not exist",
            description=f"Formula with id {id_formula} is not available"
        )
    context = {
        "user": request.user,
        "formula": formula
    }
    return render(request, "formulas/edit.html", context)


@login_required(redirect_field_name=settings.REDIRECT_FIELD_NAME)
def delete(request, id_formula):
    """
        Delete formulas, does not render a template but commit database
    """
    print(f"[DELETE] GET: {request.GET}\n\tPOST: {request.POST}")
    try:
        # Formulas are not delete as such, but instead 'eliminada' is set to True
        formula = Formula.objects.get(pk=id_formula)
        formula.disable()
        messages.info(request, f"'{formula.nombre}' se envió a la papelera")
    except Formula.DoesNotExist:
        print(f"Formula no encontrada id:{id_formula}")
        messages.error(request, "Formula no encontrada")

    finally:
        return redirect('main:home')


@login_required(redirect_field_name=settings.REDIRECT_FIELD_NAME)
@premium_required
def add_image(request, id_formula):
    """
        User upload (max 3) images that are related to their formulas
    """
    try:
        formula = Formula.objects.get(pk=id_formula)
        add_formula_is_active = "formula" in Cache.add and Cache.add["formula"]

        context = {"formula": formula,
                   "add_formula_is_active": add_formula_is_active}

        context["images"] = formula.images

        # <input type='file' name="img"... -> 'img'
        files = request.FILES.getlist(
            'img') if 'img' in request.FILES else None
        print(
            f"ADD IMAGE INPUT:\nFILES:{files}\nPOST: {request.POST}\nid_formula:{id_formula}\n")

        if request.method == "GET" or not files:
            return render(request, "formulas/add_image.html", context)

        if len(files) > MAX_IMAGES:
            messages.error(
                request, f'El número máximo de imagenes permitidas es {MAX_IMAGES}')
            return redirect(reverse('formulas:add_image', args=(formula.id,)))

        uploaded_images = []

        total_old_images = len(formula.images)
        images_to_delete = []

        for it, file in enumerate(files, 1):
            should_delete = total_old_images + it > 3

            if should_delete:
                # formula.images is ordered by id, that is a way to know which
                # image was added first, which in turn means that formula.images
                # is FIFO
                images_to_delete.append(
                    formula.images[total_old_images - 1]
                )
                total_old_images -= 1

                print(formula.images)
                print(images_to_delete)

            path, web_url = utils.store_file(
                file, id_formula=formula.id)
            image = Imagen(id_formula=formula, path=path, url=web_url)

            print(
                f"store_url: {path}\nweb_url: {web_url}")

            uploaded_images.append(image)

        if images_to_delete:
            [image.delete() for image in images_to_delete]

        [image.save() for image in uploaded_images]

        formula.update_images()

        messages.success(
            request, f"Se agregaron {len(uploaded_images)} imagenes exitosamente!")

        next_stage = not "load" in request.POST and "next" in request.POST

        if next_stage:
            if add_formula_is_active:
                print("redirecting to add_formula stage 3\n")
                return redirect(reverse('formulas:add', args=(3,)))
            return home()

        context["images"] = formula.images

        return render(request, "formulas/add_image.html", context)

    except Formula.DoesNotExist:
        return error_page(
            request,
            title="Internal error",
            description=f"Formula with id = {id_formula} does not exist"
        )


@login_required(redirect_field_name=settings.REDIRECT_FIELD_NAME)
@premium_required
def add_script(request, id_formula):
    """
        User writes valid Python code to evaluate their formulas
    """
    print(
        f"[add_script INPUT]\nGET: {request.GET}\nPOST: {request.POST}\nCache: {Cache.add}")
    formula = Formula.objects.get(pk=id_formula)
    context = {"formula": formula}
    if formula.script:
        context["script"] = formula.script

    if request.method == "GET":
        return render(request, "formulas/add_script.html", context)

    script_body = request.POST['script']
    script_vars = request.POST['variables']

    sanitized_script = utils.sanitize_script(script_body, script_vars)
    if not sanitized_script:
        messages.warning(
            request, "Invalid Script!, remember to only use math related code")
        return render(request, "formulas/add_script.html", context)

    messages.success(request, "Script creado exitosamente!")

    script = Script.objects.create(id_formula=formula,
                                   contenido=script_body,
                                   variables=script_vars
                                   )
    # Temporary: if formula already has an script, that script is deleted and replaced by the new one
    if formula.script:
        formula.update_script(script)  # deletes old script

    add_formula_is_active = "formula" in Cache.add and Cache.add["formula"]

    if add_formula_is_active:
        Cache.add = {}
        messages.success(request, "Formulada creada exitosamente!")
        return home()

    return render(request, "formulas/add_script.html", context)


@login_required(redirect_field_name=settings.REDIRECT_FIELD_NAME)
@premium_required
def images(request, id_formula):
    """
        Show available images for formula and allow responsive interaction
    """
    try:
        formula = Formula.objects.get(pk=id_formula)
    except Formula.DoesNotExist:
        return error_page(
            request,
            title="Formula does not exist",
            description=f"Formula with id {id_formula} could not be gotten"
        )
    context = {"formula": formula, "images": formula.images}
    if "add" in request.POST:
        return redirect(reverse('formulas:add_image', args=(id_formula,)))

    return render(request, "formulas/images.html", context)


@login_required(redirect_field_name=settings.REDIRECT_FIELD_NAME)
def script(request, id_formula):
    """
        Run Python code to compute formulas based on given arguments
    """
    try:
        formula = Formula.objects.get(pk=id_formula)
    except Formula.DoesNotExist:
        return error_page(
            request,
            title="Formula does not exist",
            description=f"Formula with id {id_formula} could not be gotten"
        )

    assert formula.script
    context = {"formula": formula, "script": formula.script}

    if request.POST:
        try:
            context["result"] = formula.script.run(request.POST["input_vars"])
        except Exception:
            return error_page(
                request,
                title="Error when running script",
                description=f"""The next code: \n\t{formula.script.code}
                            \nWas tried to run with input: {request.POST['input_vars']}"""
            )

    return render(request, "formulas/script.html", context)
