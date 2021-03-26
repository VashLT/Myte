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
    memo_id = set()
    formulas = load_from_index(user.id, cant_max)
    gotten_formulas = len(formulas)
    if gotten_formulas == cant_max:
        return formulas
    return list(chain(
        formulas, load_from_history(user.id, cant_max - gotten_formulas)
    ))


def load_from_index(user_id, cant_max=20):
    """
        load formulas from the table 'Indice'
    """
    try:
        # - sign in a field it means descendent order
        formulas_ids = Indice.objects.filter(
            id_usuario=user_id).order_by('-n_clicks').values_list('id_formula', flat=True)
        formulas = list(Formula.objects.filter(id__in=formulas_ids))
        if len(formulas_ids) > cant_max:
            return list(formulas[:cant_max])
        return list(formulas)
    except Indice.DoesNotExist:
        print("No formulas in Indice")
        return []


def load_from_history(user_id, cant_max=20):
    try:
        formulas_ids = Historial.objects.filter(
            id_usuario=user_id).values_list('id_formula', flat=True)
        formulas = list(Formula.objects.filter(id__in=formulas_ids))
        gotten_formulas = len(formulas_ids)
        if gotten_formulas < cant_max:
            formulas.extend(load_randomly(cant_max - gotten_formulas))
        return formulas
    except Historial.DoesNotExist:
        return load_randomly(cant_max)


def load_randomly(cant_max=20):
    all_ids = Formula.objects.all().values_list('id', flat=True)
    if not all_ids:
        raise Exception(f"No formulas to load for User with id {user_id}")
    if cant_max > len(all_ids):
        cant_max = len(all_ids)
    random_ids = random.sample(all_ids, cant_max)
    return list(Formula.objects.filter(id__in=random_ids))
