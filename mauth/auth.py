from django.contrib.auth.backends import BaseBackend

from mauth.models import User, MetaUser

from mauth import utils


class Backend(BaseBackend):
    def authenticate(self, request, username=None, password=None):
        try:
            meta = MetaUser.objects.get(nombre_usuario=username)
            if meta.check_password(password):
                return User.objects.get(meta=meta)

            print("[FAIL] password doesn't match")
        except MetaUser.DoesNotExist:
            return None
