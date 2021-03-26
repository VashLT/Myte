from django.conf import settings

from django.db import models

from mauth.models import User, Niveleducativo, Carrera

from main.models import Mytevar

from main.utils import get_session_user


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

    def __str__(self):
        return "<Formula %s>" % self.nombre

    @property
    def images(self, cache=True):
        try:
            if cache and hasattr(self, "_cache_images"):
                return self._cache_images
            self._cache_images = Imagen.objects.get(id_formula=self.id)
            return self._cache_images
        except Imagen.DoesNotExist:
            return None

    @property
    def script(self, cache=True):
        try:
            if cache and hasattr(self, "_cache_script"):
                return self._cache_script
            self._cache_script = Script.objects.get(id_formula=self.id)
            return self._cache_script
        except Script.DoesNotExist:
            return None

    @property
    def get_tags(self, user=None, cache=True):
        """
            by defaults works with the active user in session
        """
        user = user or get_session_user()
        if not user.is_premium:
            return []
        if cache and hasattr(self, "_cache_tags"):
            return self._cache_tags
        user_tags = Tag.objects.filter(id_usuario=user.id)
        if not user_tags:
            return []
        self._cache_tags = [
            tag for tag in user_tags
            if TagFormula.objects.get(id_formula=self.id, id_tag=tag.id)
        ]
        return self._cache_tags

    @property
    def latex(self):
        return self.clean_latex()

    def clean_latex(self):
        """
            format latex code with '\n' in it to html newline for each newline char
        """
        splits = self.codigo_latex.split(r"\n")
        return "$$ $$".join(splits)


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
    n_clicks = models.IntegerField(
        blank=True,
        null=True,
        db_column="numero_usos",
        verbose_name="Numero de veces que una formula ha sido clickeada")

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


class TagFormula(models.Model):
    id_tag = models.IntegerField(primary_key=True)
    id_formula = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'tagformula'
        unique_together = (('id_tag', 'id_formula'),)
