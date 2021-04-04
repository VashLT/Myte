from django.urls import path, re_path

from . import views

app_name = 'formulas'

urlpatterns = [
    path('', views.index, name='index'),
    path('add/', views.add, name='add'),
    path('add/<int:stage>', views.add, name='add'),
    path('edit/<int:id_formula>', views.edit, name='edit'),
    path('delete/<int:id_formula>', views.delete, name='delete'),
    path('images/add/<int:id_formula>', views.add_image, name='add_image'),
    path('images/<int:id_formula>', views.images, name='images'),
    path('script/add/<int:id_formula>', views.add_script, name='add_script'),
    path('script/<int:id_formula>', views.script, name='script'),
    path('liveupdate/', views.liveupdate, name='liveupdate')
]
