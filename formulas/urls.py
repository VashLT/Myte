from django.urls import path, re_path

from . import views

app_name = 'formulas'

urlpatterns = [
    path('home/formulas', views.index, name='index'),
    path('home/formulas/add', views.add, name='add'),
    path('home/formulas/edit', views.edit, name='edit'),
    path('home/formulas/delete', views.delete, name='delete'),
    path('home/formulas/images/add', views.add_image, name='images'),
    path('home/formulas/script/add', views.add_script, name='script'),
    path('home/liveupdate', views.liveupdate, name='liveupdate')
]
