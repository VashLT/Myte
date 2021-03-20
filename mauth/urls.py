from django.urls import path, re_path

from . import views

app_name = 'mauth'

urlpatterns = [
    path('login/', views.login, name='login'),
    # re_path(r'^register/((?P<stage>\d+)/)?$', views.register, name='register')
    path("register/", views.register),
    path("register/<int:stage>", views.register, name='register'),
]
