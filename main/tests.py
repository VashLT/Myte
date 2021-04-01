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
    formula = Formula.objects.get(id=5)
    context = {"formula": formula}
    print(request.FILES)
    files = request.FILES.getlist('img') if 'img' in request.FILES else None
    if files:
        uploaded_images = []
        for file in files:
            store_url, ofile = f_utils.store_file(file, id_formula=formula.id)
            im = Imagen(id_formula=formula, path=store_url)

            print(f"store_url: {store_url}\nweb_url: {ofile.url(store_url)}")

            im.set_file(ofile)  # web url where image can be seen
            im.save()
            uploaded_images.append(im)
        context["uploaded_images"] = uploaded_images

    return render(request, "main/test.html", context)


def log_user(request):
    user = authenticate(request, username="pepe1", password="hola")
    login(request, user)
    return user
