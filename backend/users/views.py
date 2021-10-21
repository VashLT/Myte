from django.contrib.auth import login

# Django REST Framework
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

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
        response.set_cookie('access_token', token)

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
