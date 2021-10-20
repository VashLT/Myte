from djongo import models
from djongo.models.fields import ArrayField
from django import forms

class Image(models.Model):

    id_image = models.AutoField(primary_key=True)
    added_at = models.DateTimeField()
    url = models.CharField()
    title = models.CharField()

    class Meta:
        abstract = True

class ImageForm(forms.ModelForm):

    class Meta:
        model = Image
        fields = (
            'id_image', 'added_at', 'url', 'title'
        )

class Formulas(models.Model):

    id_formula = models.AutoField(primary_key=True)
    added_at = models.DateTimeField()
    tags = models.ArrayField(
        model_container=models.CharField, #type:ignore
    )
    title = models.TextField()
    latex_code = models.CharField()
    images = models.ArrayField(
        model_container=Image,
        model_form_class=ImageForm
    )
    is_deleted = models.BooleanField()
    category = models.CharField()
