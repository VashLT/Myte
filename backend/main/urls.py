from django.urls import path, re_path

from . import views, tests

app_name = 'main'

urlpatterns = [
    path('', views.index, name='index'),
    path("home/", views.home, name='home'),
    path("home/premium", views.premium, name='premium'),
    path("test/", tests.test, name='test')
]
