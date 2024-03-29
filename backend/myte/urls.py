"""myte URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path

from rest_framework import routers

import users.views
import maths.views

# REST router
router = routers.DefaultRouter()
router.register(r'formulas', maths.views.FormulaView, 'formula')
router.register(r'mathusers', maths.views.MathUserView, 'users')
router.register(r'user', users.views.UserViewSet, 'user')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', admin.site.urls),

    # REST
    path('api/categories/', maths.views.CategoriesView.as_view()),
    path('api/tags/add/', maths.views.AddTagsView.as_view()),
    path('api/tags/', maths.views.TagsView.as_view()),
    path('api/logout/', users.views.LogoutView.as_view()),
    path('api/', include(router.urls)),
]
