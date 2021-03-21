from django.conf import settings

from django.db import models

from mauth.models import User, Niveleducativo, Carrera


class Categoria(models.Model):
    id = models.AutoField(primary_key=True, db_column='id_categoria')
    id_categoriapadre = models.ForeignKey(
        'self', models.PROTECT, db_column='id_categoriapadre', blank=True, null=True)
    nombre = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'categoria'


class Recomendacion(models.Model):
    id = models.AutoField(primary_key=True, db_column='id_recomendacion')
    id_categoria = models.ForeignKey(
        Categoria, models.PROTECT, db_column='id_categoria', blank=True, null=True)
    id_niveleducativo = models.ForeignKey(
        Niveleducativo, models.PROTECT, db_column='id_niveleducativo', blank=True, null=True)
    id_carrera = models.ForeignKey(
        Carrera, models.PROTECT, db_column='id_carrera', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'recomendacion'


class Categoriaformula(models.Model):
    id_categoria = models.IntegerField(primary_key=True)
    id_formula = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'categoriaformula'
        unique_together = (('id_categoria', 'id_formula'),)


class Formula(models.Model):
    id = models.AutoField(primary_key=True, db_column='id_formula')
    nombre = models.CharField(max_length=100)
    codigo_latex = models.CharField(max_length=250, blank=True, null=True)
    fecha_creacion = models.DateField(blank=True, null=True)
    creada = models.IntegerField()
    eliminada = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'formula'


class Historial(models.Model):
    id = models.AutoField(primary_key=True, db_column='id_historial')
    id_usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL, models.CASCADE, db_column='id_usuario', blank=True, null=True)
    id_formula = models.ForeignKey(
        Formula, models.PROTECT, db_column='id_formula', blank=True, null=True)
    fecha_registro = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'historial'


class Imagen(models.Model):
    id = models.AutoField(primary_key=True, db_column='id_imagen')
    id_formula = models.ForeignKey(
        Formula, models.CASCADE, db_column='id_formula', blank=True, null=True)
    path = models.CharField(max_length=200)

    class Meta:
        managed = False
        db_table = 'imagen'


class Indice(models.Model):
    id = models.AutoField(primary_key=True, db_column='id_index')
    id_usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL, models.CASCADE, db_column='id_usuario', blank=True, null=True)
    id_formula = models.ForeignKey(
        Formula, models.CASCADE, db_column='id_formula', blank=True, null=True)
    numero_usos = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'indice'


class Script(models.Model):
    id = models.AutoField(primary_key=True, db_column='id_script')
    id_formula = models.ForeignKey(
        Formula, models.CASCADE, db_column='id_formula', blank=True, null=True)
    contenido = models.CharField(max_length=1000)
    variables_script = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'script'


class Tag(models.Model):
    id = models.AutoField(primary_key=True, db_column='id_tag')
    id_usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL, models.CASCADE, db_column='id_usuario', blank=True, null=True)
    nombre = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'tag'


class Tagformula(models.Model):
    id_tag = models.IntegerField(primary_key=True)
    id_formula = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'tagformula'
        unique_together = (('id_tag', 'id_formula'),)
