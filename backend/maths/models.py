from djongo import models
from djongo.models.fields import ArrayField
from django import forms
from django.contrib.auth.models import User

class Formula(models.Model):
    _id = models.ObjectIdField()
    id_formula = models.PositiveIntegerField(unique=True)
    added_at = models.DateTimeField()
    # tags = ArrayField(
    #     model_container=StringObject, #type:ignore
    #     model_form_class=StringObjectForm, #type:ignore
    # )
    tags = models.TextField(max_length=200)
    category = models.TextField(max_length=200, blank=True)
    title = models.TextField()
    latex_code = models.TextField(max_length=200)
    images = models.TextField(max_length=200)
    is_deleted = models.BooleanField(default=False, blank=True)
    is_created = models.BooleanField(default=True, blank=True)

class MathUser(models.Model):
    _id = models.ObjectIdField()
    username = models.TextField(max_length=200, unique=True)
    formulas = models.TextField(max_length=200)
    tags = models.TextField(max_length=200)