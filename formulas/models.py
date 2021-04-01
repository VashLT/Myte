import traceback

import os

from django.conf import settings

from django.db import models

from django.db.models import Q

from .storage import FileStorage

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
    fecha_creacion = models.DateField(auto_now_add=True)
    creada = models.IntegerField(
        default=1, verbose_name='1: Creada por el usuario, 0: Predefinida')
    eliminada = models.IntegerField(
        default=0, verbose_name="1: Formula eliminada")

    _cache_images = None
    _cache_script = None
    _cache_tags = None

    class Meta:
        managed = False
        db_table = 'formula'

    def __str__(self):
        return "<Formula %s>" % (self.nombre or 'No name yet')

    @property
    def images(self):
        if self._cache_images:
            return self._cache_images

        self._cache_images = list(Imagen.objects.filter(
            id_formula=self.id).order_by('-id'))
        return self._cache_images

    def update_images(self):
        """
            changes value of cached images
        """
        self._cache_images = list(Imagen.objects.filter(id_formula=self.id))

    @ property
    def script(self):
        if self._cache_script:
            return self._cache_script

        try:
            # as long as only 1 script is allow get will work
            self._cache_script = Script.objects.get(id_formula=self.id)
            return self._cache_script

        except Script.DoesNotExist:
            return None

    @ property
    def get_tags(self, user=None, cache=True):
        """
            by defaults works with the active user in session
        """
        user = user or get_session_user()
        if not user.is_premium:
            return []
        if hasattr(self, "_cache_tags"):
            return self._cache_tags
        user_tags = Tag.objects.filter(id_usuario=user.id)
        if not user_tags:
            return []
        self._cache_tags = [
            tag for tag in user_tags
            if TagFormula.objects.get(id_formula=self.id, id_tag=tag.id)
        ]
        return self._cache_tags

    @ property
    def latex(self):
        return self.clean_latex()

    def update_script(self, new_script):
        if self._cache_script:
            self._cache_script.delete()

        else:
            current_scripts = Script.objects.filter(
                id_formula=self.id)  # two scripts should be found
            assert len(current_scripts) == 2
            # here ~Q means 'not equal to', https://docs.djangoproject.com/en/3.1/topics/db/queries/#complex-lookups-with-q-objects
            old_script = current_scripts.filter(~Q(id=new_script.id))
            old_script.delete()

        self._cache_script = new_script
        return self._cache_script

    def disable(self):
        """
            Formulas are not delete but instead they are disable
        """
        self.eliminada = True
        query = Indice.objects.filter(id_formula=self.id)
        if query:
            print(f"Elements in next query will be deleted: {query}")
            query.delete()

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
    url = models.CharField(
        max_length=200,
        verbose_name="Url relativa donde se visualiza la imagen en el navegador"
    )

    class Meta:
        managed = False
        db_table = 'imagen'

    @ property
    def name(self):
        """
            name of file
        """
        if hasattr(self, "_cache_name"):
            return self._cache_name
        self._cache_name = os.path.basename(self.path)
        return self._cache_name

    def get_file(self):
        if hasattr(self, "_file"):
            return self._file

        self._file = FileStorage(location=self.path, base_url=self.url)
        return self._file

    def set_file(self, file):
        """
            file: formulas.storage.FileStorage type
        """
        assert isinstance(file, FileStorage)
        self._file = file
        self.url = self._file.url(self.path)


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
    variables_script = models.CharField(
        max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'script'

    @property
    def code(self):
        return self.contenido

    def get_var_list(self):
        return Script.format_input(self.variables_script)

    def run(self, values):
        """
            > values: <str> with format -> val1, val2, ..., valn

            OUTPUT: <float> code property evaluated in values
        """
        can_be_cached = hasattr(
            self, "_cache") and values == self._cache['values']

        if can_be_cached:
            return self._cache['result']

        processed_values = Script.format_input(values)

        try:
            value_list = [float(value) for value in processed_values]

        except:
            print('Invalid value!, returning nothing . . .')
            return None

        vars = self.get_var_list()

        var_dict = {}

        # Generates var_dict for eval function (AKA locals)
        for i, name in enumerate(vars):
            var_dict[name] = value_list[i]

        var_dict.update({'math': math})

        try:
            result = eval(self.contenido, var_dict)
        except Exception:
            traceback.print_exc()
            return None

        self._cache = {'values': values, 'result': result}

        return result

    @staticmethod
    def format_input(input):
        return input.replace(' ', '').split(',')


class Tag(models.Model):
    id = models.AutoField(primary_key=True, db_column='id_tag')
    id_usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL, models.CASCADE, db_column='id_usuario', blank=True, null=True)
    nombre = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'tag'

    def clean_nombre(self):
        """
        returns tags-like #{tag name}
        """
        block = "-".join(self.nombre.split(" "))
        return "".join(["#", block])


class TagFormula(models.Model):
    id_tag = models.IntegerField(primary_key=True)
    id_formula = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'tagformula'
        unique_together = (('id_tag', 'id_formula'),)
