from django.contrib import admin

from mauth.models import User, MetaUser, Rol

# Register your models here.

admin.register(User)
admin.register(MetaUser)
admin.register(Rol)
