from mauth.models import User, MetaUser
from formulas.models import (
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
    if len(formulas) == cant_max:
        return formulas
    # TODO: Load formulas randomly


def load_from_index(user_id, cant_max=20):
    """
        load formulas from the table 'Indice'
    """
    try:
        # - sign in a field it means descendent order
        formulas_set = Indice.objects.filter(
            id_usuario=user_id).order_by('-n_clicks')
        if len(formulas_set) > cant_max:
            return formulas_set[:cant_max]
        return formulas_set
    except Indice.DoesNotExist:
        print("No formulas in Indice")
        return None
