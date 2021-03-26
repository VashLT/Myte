from mauth.models import User

from .models import Mytevar


def get_session_user():
    user_id = Mytevar.objects.get(nombre="current_user").valor
    return User.objects.get(id=user_id)
