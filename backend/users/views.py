from django.contrib.auth import authenticate, login, logout

# Django REST Framework
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from maths.models import Formula, MathUser
from maths.serializers import FormulaSerializer

import json
# Serializers
from users.serializers import (
    UserLoginSerializer,
    UserModelSerializer,
    UserSignUpSerializer,
)

# Models
from django.contrib.auth.models import User
from users import utils


class UserViewSet(viewsets.GenericViewSet):

    queryset = User.objects.filter(is_active=True)
    serializer_class = UserModelSerializer

    # Detail define si es una petición de detalle o no, en methods añadimos el método permitido, en nuestro caso solo vamos a permitir post
    @action(detail=False, methods=["post"])
    def login(self, request):
        """User sign in."""
        print(request.data)
        # First clear everything before login
        logout(request)
        serializer = UserLoginSerializer(data=request.data)

        if not serializer.is_valid(raise_exception=False):
            data = {
                "info": "password or username are not valid",
                "failure": "validation failed",
            }

            return Response(data, status=status.HTTP_403_FORBIDDEN)

        user, token = serializer.save()
        
        data = {
            "info": "success validation",
            "success": "user validated",
            "user": UserModelSerializer(user).data,
            "access_token": token,
        }

        response = Response(data, status=status.HTTP_201_CREATED)

        # Use default django authentication
        login(request, user)

        return response

    @action(detail=False, methods=["post"])
    def register(self, request):
        """User sign up."""
        serializer = UserSignUpSerializer(data=request.data)

        if not serializer.is_valid(raise_exception=True):
            data = {"info": "validation failed", "failure": "registration failed"}
            print(serializer.error_messages)

            return Response(data, status=status.HTTP_403_FORBIDDEN)

        user = serializer.save()
        data = {
            "info": "success validation",
            "success": "user validated",
            "user": UserModelSerializer(user).data,
        }

        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["get"])
    def auth(self, request):
        
        serialized_user = UserModelSerializer(request.user)
        print(dict(serialized_user.data))

        if not serialized_user or serialized_user.data['username'] == '':
            response = {
                'error': 'not auth'
            }
            stat = status.HTTP_403_FORBIDDEN

        else:
            response = {
                "data": serialized_user.data,
            }
            stat = status.HTTP_200_OK

        return Response(response, status=stat)

    @action(detail=False, methods=["post"])
    def logout(self, request):
        
        logout(request)

        data = {
            "info": "success logout",
            "success": "user logged out",
        }

        return Response(data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["post"])
    def search(self, request):
        try:
            user = User.objects.get(username=request.data['username'])
        except Exception:
            return Response({'error': 'user not found'}, status=status.HTTP_406_NOT_ACCEPTABLE)

        

        raw_formula_ids = MathUser.objects.get(username=user.username).formulas
        formula_ids = [int(fid) for fid in json.loads(raw_formula_ids)]
        print(formula_ids)
        formulas = []

        for fid in formula_ids:
            result = Formula.objects.filter(id_formula=fid)

            for formula in result:
                formulas.append(FormulaSerializer(formula).data)

        iuser = {
            'id_user': user.id,
            'username': user.username,
            'first_name': user.first_name,
            'email': user.email,
            'registered_at': user.date_joined,
            'created_formulas': formulas #Esto es el array de formulas
        }

        data = {
            'user': iuser,
        }

        return Response(data, status=status.HTTP_200_OK)
