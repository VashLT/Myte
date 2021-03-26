from itertools import chain

import random

from mauth.models import User, MetaUser
from formulas.models import (
    Historial,
    Indice,
    Formula,
    Categoria,
    Tag,
    Imagen,
    Script
)


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
        formulas = Formula.objects.filter(id__in=formulas_ids)

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

        formulas = list(Formula.objects.filter(id__in=formulas_ids))
        gotten_formulas = len(formulas)

        print(f"loaded {gotten_formulas} from history")

        if gotten_formulas < cant_max:
            formulas.extend(load_randomly(cant_max - gotten_formulas))

        return formulas[:cant_max]
    except Historial.DoesNotExist:
        return load_randomly(cant_max)


def load_randomly(cant_max=20):
    formulas = Formula.objects.all()
    if not formulas:
        raise Exception(f"No formulas to load")

    total = len(formulas)

    if cant_max > total:
        cant_max = total

    print(f"loaded {total} randomly")
    return random.sample(formulas, cant_max)
