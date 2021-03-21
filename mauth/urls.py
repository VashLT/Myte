from django.urls import path, re_path

from . import views

app_name = 'mauth'

urlpatterns = [
    path('login/', views.login, name='login'),
    path('login/<str:test>', views.login, name='login'),
    path("register/", views.register),
    path("register/<int:stage>", views.register, name='register'),
]
