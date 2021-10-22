from django.shortcuts import render
from django.views import View
from django.http import HttpResponse, JsonResponse
from maths import models

from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework import viewsets
from .serializers import ImageSerializer, FormulaSerializer
from .models import Formula, Image

import datetime

class CreateFormula(View):

    def get(self, request):
        coso = models.Image.objects.create(
            id_image = 1,
            added_at = datetime.datetime.now(),
            url = 'ejemplo,com',
            title = 'exampletitle',
        )
        
        response = {
            'result': 'success'
        }

        return JsonResponse(response)

class ImageView(viewsets.ModelViewSet):

    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    # lookup_field = 'id_image'
    lookup_field = 'id'

class FormulaView(viewsets.ModelViewSet):

    queryset = Formula.objects.all()
    serializer_class = FormulaSerializer
    # lookup_field = 'id_formula'

    # @action(detail=True)
    # def search(self, request):
    #     pass

# class UserViewSet(viewsets.GenericViewSet):

#     queryset = User.objects.filter(is_active=True)
#     serializer_class = UserModelSerializer

#     # Detail define si es una petición de detalle o no, en methods añadimos el método permitido, en nuestro caso solo vamos a permitir post
#     @action(detail=False, methods=["post"])
#     def login(self, request):
#         """User sign in."""
#         print(request.data)
#         # First clear everything before login
#         logout(request)
#         serializer = UserLoginSerializer(data=request.data)

#         if not serializer.is_valid(raise_exception=False):
#             data = {
#                 "info": "password or username are not valid",
#                 "failure": "validation failed",
#             }

#             return Response(data, status=status.HTTP_403_FORBIDDEN)

#         user, token = serializer.save()
        
#         data = {
#             "info": "success validation",
#             "success": "user validated",
#             "user": UserModelSerializer(user).data,
#             "access_token": token,
#         }

#         response = Response(data, status=status.HTTP_201_CREATED)

#         # Use default django authentication
#         login(request, user)

#         return response

#     @action(detail=False, methods=["post"])
#     def register(self, request):
#         """User sign up."""
#         serializer = UserSignUpSerializer(data=request.data)

#         if not serializer.is_valid(raise_exception=True):
#             data = {"info": "validation failed", "failure": "registration failed"}
#             print(serializer.error_messages)

#             return Response(data, status=status.HTTP_403_FORBIDDEN)

#         user = serializer.save()
#         data = {
#             "info": "success validation",
#             "success": "user validated",
#             "user": UserModelSerializer(user).data,
#         }

#         return Response(data, status=status.HTTP_201_CREATED)

#     @action(detail=False, methods=["get"])
#     def auth(self, request):
        
#         serialized_user = UserModelSerializer(request.user)
#         print(dict(serialized_user.data))

#         if not serialized_user or serialized_user.data['username'] == '':
#             response = {
#                 'error': 'not auth'
#             }
#             stat = status.HTTP_403_FORBIDDEN

#         else:
#             response = {
#                 "data": serialized_user.data,
#             }
#             stat = status.HTTP_200_OK

#         return Response(response, status=stat)