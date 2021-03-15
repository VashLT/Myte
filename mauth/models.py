from django.db import models

# Create your models here.


class Rol(models.Model):
    nombre = models.CharField(max_length=100, null=False)

    class Meta:
        db_table = 'rol'


class MetaUsuario(models.Model):
    nombre_usuario = models.CharField(max_length=100, primary_key=True)
    clave_encriptada = models.CharField(max_length=100)

    def get_user(self):
        return User.objects.get(nombre_usuario=self.nombre_usuario)

    def __str__(self):
        return "MetaUsuario %s" % (nombre_usuario,)


class User(models.Model):
    id = models.AutoField(primary_key=True, db_column='id_usuario')
    id_rol = models.OneToOneField(
        Rol, on_delete=models.PROTECT, verbose_name="Rol del usuario")
    nombre_usuario = models.OneToOneField(
        MetaUsuario, on_delete=models.CASCADE, verbose_name="Meta información del usuario")
    nombre = models.CharField(max_length=100, null=False)

    def __str__(self):
        return "Usuario named %s with id %d" % (nombre_usuario, id)

    class Meta:
        db_table = 'usuario'

