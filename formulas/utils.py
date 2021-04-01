from itertools import chain

from pathlib import Path

import random

from django.conf import settings

from django.db.models import Q

from .models import (
    Historial,
    Indice,
    Formula,
    Categoria,
    Tag,
    Imagen,
    Script
)

from .storage import FileStorage

from mauth.models import User, MetaUser


def store_file(file, id_formula):
    """
        handles uploaded files storage

        OUTPUT: Path object (contains path where file was stored)
    """
    fs = FileStorage()

    path = Path(get_image_path(id_formula) / file.name)
    if path.exists():
        # temporary: Image is overwrite without asking to the user
        pass

    filename = fs.save(str(path), file)
    image_web_url = fs.url(filename)

    return filename, image_web_url


def get_image_path(id_formula):
    """
        build a valid location to store (new) image of formula with
        id 'id_formula'
        > exists: True indicates that an image already exists

        OUTPUT: Path object
    """
    path = Path(settings.MEDIA_ROOT / "formulas" / str(id_formula))
    if not path.exists():
        path.mkdir(parents=True, exist_ok=True)
    return path


def load_formulas(user, cant_max=20):
    """
        load formulas as follows:
            - load from 'Indice' table as much formulas as possible
            till cant_max
            - if cant_max is not reached yet it loads from
            'Historial' table
            - complete the remaining formulas with general formulas in random way
    """
    formulas = load_from_index(user.id, cant_max)
    gotten_formulas = len(formulas)

    if gotten_formulas == cant_max:
        return list(formulas)

    # avoid loading repeated formulas
    id_set = set(formulas.values_list('id', flat=True))

    return list(chain(
        formulas,
        load_from_history(
            user.id,
            cant_max=cant_max - gotten_formulas,
            memo_id=id_set
        )
    ))


def load_from_index(user_id, cant_max=20):
    """
        load formulas from the table 'Indice'
    """
    try:
        # - sign in a field it means descendent order
        formulas_ids = Indice.objects.filter(
            id_usuario=user_id).order_by('-n_clicks').values_list('id_formula', flat=True)
        formulas = Formula.objects.filter(id__in=formulas_ids, eliminada=False)

        if len(formulas_ids) > cant_max:
            print(f"loaded {cant_max} from index")
            return formulas[:cant_max]

        print(f"loaded {len(formulas)} from index")
        return formulas
    except Indice.DoesNotExist:
        print("No formulas in index")
        return []


def load_from_history(user_id, cant_max=20, memo_id=None):
    try:
        formulas_ids = set(Historial.objects.filter(
            id_usuario=user_id).values_list('id_formula', flat=True))
        if memo_id:
            formulas_ids = formulas_ids.difference(memo_id)  # distinct ids

        formulas = list(Formula.objects.filter(
            id__in=formulas_ids, eliminada=False))
        gotten_formulas = len(formulas)

        if gotten_formulas < cant_max:
            formulas.extend(load_randomly(cant_max - gotten_formulas))

        print(
            f"loaded {gotten_formulas} formulas from history, and {cant_max} were taken")

        return formulas[:cant_max]
    except Historial.DoesNotExist:
        return load_randomly(cant_max)


def load_randomly(cant_max=20):
    formulas = list(Formula.objects.all())
    if not formulas:
        raise Exception(f"No formulas to load")

    total = len(formulas)

    if cant_max > total:
        cant_max = total

    print(f"loaded {total} randomly")
    return random.sample(formulas, cant_max)


def sanitize_script(script_body, script_vars):
    """

    """

    script_vars = script_vars.replace(' ', '')

    processed_vars = script_vars.split(',')

    for var in processed_vars:
        if var[0].isnumeric():
            print('variable no permitida en script!')
            return None

    blacklisted_code = ['os.', 'system.', '__', '\\']
    for element in blacklisted_code:

        if element in script_body:
            print('Elemento no permitido en script!')
            return None

    return (script_body, script_vars)
