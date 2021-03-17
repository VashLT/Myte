from django.db import models


# Create your models here.


class Rol(models.Model):
    id = models.AutoField(primary_key=True, db_column='id_rol')
    nombre = models.CharField(max_length=100, null=False)

    class Meta:
        managed = False
        db_table = 'rol'


class Niveleducativo(models.Model):
    id = models.AutoField(primary_key=True, db_column='id_niveleducativo')
    nombre = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'niveleducativo'


class Carrera(models.Model):
    id = models.AutoField(primary_key=True, db_column='id_carrera')
    nombre = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'carrera'


class Interes(models.Model):
    id_usuario = models.IntegerField(primary_key=True)
    id_carrera = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'interes'
        unique_together = (('id_usuario', 'id_carrera'),)


class MetaUser(models.Model):
    nombre_usuario = models.CharField(max_length=100, primary_key=True)
    clave_encriptada = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'MetaUsuario'

    def get_user(self):
        return User.objects.get(nombre_usuario=self.nombre_usuario)

    def __str__(self):
        return "MetaUsuario %s" % (self.nombre_usuario,)


class User(models.Model):
    id = models.AutoField(primary_key=True, db_column='id_usuario')
    id_rol = models.OneToOneField(
        Rol, on_delete=models.PROTECT, verbose_name="Rol del usuario")
    nombre_usuario = models.OneToOneField(
        MetaUser, on_delete=models.CASCADE, verbose_name="Meta información del usuario")
    nombre = models.CharField(max_length=100, null=False)
    fecha_registro = models.DateField(auto_now=True)
    email = models.CharField(max_length=120)
    fecha_nacimiento = models.DateField(null=False)

    class Meta:
        managed = False
        db_table = 'usuario'

    def __str__(self):
        return "Usuario named %s with id %d" % (self.nombre_usuario, self.id)
