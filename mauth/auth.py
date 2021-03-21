from django.contrib.auth.backends import BaseBackend

from mauth.models import User, MetaUser

from mauth import utils


class Backend(BaseBackend):
    def authenticate(self, request, username=None, password=None):
        try:
            meta = MetaUser.objects.get(nombre_usuario=username)
            if meta.check_password(password):
                user = User.objects.get(meta=meta)
                print(f"Valid authentication for {user}")
                return user

            print("[FAIL] password doesn't match")
        except MetaUser.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
    
    def user_can_authenticate(self, user):
        """
        Reject users with is_active=False. Custom user models that don't have
        that attribute are allowed.
        """
        is_active = getattr(user, 'is_active', None)
        return bool(is_active)
