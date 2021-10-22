from djongo import models
from djongo.models.fields import ArrayField
from django import forms

class Image(models.Model):
    _id = models.ObjectIdField()
    id_image = models.PositiveIntegerField()
    date = models.DateTimeField()
    url = models.CharField(max_length=200)
    title = models.CharField(max_length=200)

    objects = models.DjongoManager()
    def _str_(self):
        return self.url

class ImageForm(forms.ModelForm):

    class Meta:
        model = Image
        fields = (
            # 'id_image', 
            'date', 
            'url', 
            'title'
        )

class StringObject(models.Model):
    content = models.CharField(max_length=50)

    class Meta:
        abstract = True

class StringObjectForm(forms.ModelForm):

    class Meta:
        model = StringObject
        fields = (
            'content',
        )

class Formula(models.Model):
    _id = models.ObjectIdField()
    id_formula = models.PositiveIntegerField()
    added_at = models.DateTimeField()
    # tags = ArrayField(
    #     model_container=StringObject, #type:ignore
    #     model_form_class=StringObjectForm, #type:ignore
    # )
    tags = models.TextField(max_length=200)
    category = models.TextField(max_length=200)
    title = models.TextField()
    latex_code = models.TextField(max_length=200)
    images = ArrayField(
        model_container=Image,
        model_form_class=ImageForm
    )
    is_deleted = models.BooleanField()
