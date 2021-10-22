from django.core.exceptions import ValidationError
from django.shortcuts import render
from django.views import View
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from maths import models

from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework import status, viewsets
from .serializers import FormulaSerializer, MathUserSerializer
from .models import Formula, MathUser

import datetime

class FormulaView(viewsets.ModelViewSet):

    queryset = Formula.objects.all()
    serializer_class = FormulaSerializer
    lookup_field = 'id_formula'

    def formulas_to_response(self, result):
        formulas = [FormulaSerializer(formula).data for formula in result]
        # data = {'formulas' : formulas}
        # return Response(data, status=status.HTTP_200_OK)


    @action(detail=False, methods=["post"])
    def search(self, request):

        active_formulas = Formula.objects.filter(is_deleted__in=[False])

        if not request.data or request.data['data'] == '':
            result = active_formulas
            formulas = [FormulaSerializer(formula).data for formula in result]
            data = {'formulas' : formulas}
            return Response(data, status=status.HTTP_200_OK)
        
        formulas = set()
        criterion = request.data['data']
        # title id date tag cat 

        # Busqueda por title
        query = {"title__icontains": criterion, }
        if result := active_formulas.filter(**query):
            formulas.update([FormulaSerializer(formula).data for formula in result])

        # Busqueda por id
        try:
            query = {"id_formula": int(criterion)}
            if result := active_formulas.filter(**query):
                formulas.update([FormulaSerializer(formula).data for formula in result])
        except ValueError:
            pass

        # Busqueda por date
        query = {"added_at": criterion}
        try:
            if result := active_formulas.filter(**query):
                formulas.update([FormulaSerializer(formula).data for formula in result])
            
        except ValidationError as e:
            pass
        
        # Busqueda por categoria
        query = {"category__icontains": criterion}
        if result := active_formulas.filter(**query):
                formulas.update([FormulaSerializer(formula).data for formula in result])
        
        # Busqueda por tags
        query = {"tags__icontains": criterion}
        if result := active_formulas.filter(**query):
                formulas.update([FormulaSerializer(formula).data for formula in result])

        data = {'formulas' : list(formulas)}
        return Response(data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=["post"])
    def add(self, request):
        formula = FormulaSerializer(request.data).create(request.data)
        math_user = MathUser.objects.get(username=request.user.username)
        
        if math_user.formulas == "[]":
            math_user.formulas = f'[{formula.id_formula}]'
        
        else:
            math_user.formulas = f'{math_user.formulas[:-1]}, {formula.id_formula}]'
        
        print(math_user.formulas)

        math_user.save()
        return Response(FormulaSerializer(formula).data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["post"])
    def delete(self, request):

        try:
            fid = int(request.data['id_formula'])

        except ValueError:
            data = {'error': 'id is not numeric'}
            return Response(data, status=status.HTTP_403_FORBIDDEN)


        if not (result := Formula.objects.filter(id_formula=fid)):
            data = {'error': 'formula not found'}
            return Response(data, status=status.HTTP_403_FORBIDDEN)

        # This will iterate only once
        for formula in result:
            formula.is_deleted = True
            formula.save()

        data = {'info': 'formula marked as deleted'}
        return Response(data, status=status.HTTP_200_OK)
        

class MathUserView(viewsets.ModelViewSet):

    queryset = MathUser.objects.all()
    serializer_class = MathUserSerializer
    lookup_field = 'username'


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