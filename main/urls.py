from django.urls import path, re_path

from . import views

app_name = 'main'

urlpatterns = [
    path('', views.index, name='index'),
    path("home/", views.home, name='home'),
]
