from django.conf import settings

from django.db import models

from django.utils import timezone

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

from django.utils.translation import gettext_lazy as _

from django.utils.crypto import salted_hmac

from mauth import utils


ADMIN_ROL = 3
DATE_INPUT_FORMATS = [r"%d/%m/%Y"]


class Rol(models.Model):
    id = models.AutoField(primary_key=True, db_column='id_rol')
    nombre = models.CharField(max_length=100, null=False)

    class Meta:
        managed = False
        db_table = 'rol'


class MetaUser(models.Model):
    nombre_usuario = models.CharField(max_length=100, primary_key=True)
    clave_encriptada = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'MetaUsuario'

    def check_password(self, raw_pw):
        return self.clave_encriptada == utils.encrypt(raw_pw)

    def get_user(self):
        return User.objects.get(nombre_usuario=self.nombre_usuario)

    def set_password(self, raw_pw):
        self.clave_encriptada = utils.encrypt(raw_pw)
        self._password = raw_pw

    def __str__(self):
        return "MetaUsuario %s" % (self.nombre_usuario,)


class UserManager(BaseUserManager):
    def create_user(self, username, email, name, rol, birthdate, password):
        if not username:
            raise ValueError("User must have an username")
        if not email:
            raise ValueError("User must have an email")
        if not name:
            raise ValueError("User must have a name")
        if not rol:
            raise ValueError("User must have a rol")
        if not birthdate:
            raise ValueError("User must have a birthdate")
        if not password:
            raise ValueError("User must have a password")
        meta = MetaUser(
            nombre_usuario=username,
            clave_encriptada=utils.encrypt(password)
        )
        user = self.model(
            email=self.normalize_email(email),
            meta=meta,
            nombre=name,
            rol=rol,
            fecha_nacimiento=birthdate
        )
        meta.save(using=self._db)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, name, rol, birthdate, password=None):
        user = self.create_user(
            email=self.normalize_email(email),
            nombre_usuario=username,
            nombre=name,
            rol=ADMIN_ROL,
            fecha_nacimiento=birthdate
        )
        return user


class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True, db_column='id_usuario')
    rol = models.OneToOneField(
        Rol, on_delete=models.PROTECT, verbose_name="Rol del usuario", db_column="id_rol")
    meta = models.OneToOneField(
        MetaUser, on_delete=models.CASCADE, verbose_name="Meta información del usuario", db_column="nombre_usuario")
    nombre = models.CharField(max_length=100, null=False)
    fecha_registro = models.DateField(auto_now_add=True)
    is_active = models.IntegerField(
        default=1,
        db_column="activo",
        verbose_name="1: Usuario activo, 0: Usuario inactivo")
    email = models.CharField(max_length=120)
    fecha_nacimiento = models.DateField(null=False)

    last_login = models.DateTimeField(
        _('last login'), auto_now_add=True, db_column="ultimo_ingreso")

    password = None

    objects = UserManager()

    USERNAME_FIELD = 'meta'
    REQUIRED_FIELDS = ['rol', 'nombre', 'email', 'fecha_nacimiento']

    class Meta:
        managed = False
        db_table = 'usuario'

    def __str__(self):
        return "Usuario named %s with id %d" % (self.get_username(), self.id)

    def get_username(self):
        return self.meta.nombre_usuario

    def update_last_login(self):
        self.last_login = timezone.now()

    def set_password(self, raw_password):
        self.meta.set_password(raw_password)

    def check_password(self, raw_password):
        return self.meta.check_password(raw_password)

    def get_full_name(self):
        return self.nombre

    def get_short_name(self):
        return self.nombre.split(" ")[0]

    def get_session_auth_hash(self):
        """
        Slight modification of django get_session_auth_hash to make it compatible with Myte
        Return an HMAC of the password field.
        """
        key_salt = "django.contrib.auth.models.AbstractBaseUser.get_session_auth_hash"
        return salted_hmac(
            key_salt,
            self.meta.clave_encriptada,
            # RemovedInDjango40Warning: when the deprecation ends, replace
            # with:
            # algorithm='sha256',
            algorithm=settings.DEFAULT_HASHING_ALGORITHM,
        ).hexdigest()


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
    id_usuario = models.IntegerField(primary_key=True, db_column="id_usuario")
    id_carrera = models.IntegerField(db_column="id_carrera")

    class Meta:
        managed = False
        db_table = 'interes'
        unique_together = (('id_usuario', 'id_carrera'),)
