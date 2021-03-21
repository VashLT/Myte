from django.urls import path, re_path

from . import views

app_name = 'formulas'

urlpatterns = [
    path('home/formulas', views.index, name='index'),
]
