from django.contrib.auth import password_validation, authenticate
from django.core.validators import RegexValidator, FileExtensionValidator

# Django REST Framework
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator

# Models
from django.contrib.auth.models import User
from maths.models import MathUser

class UserModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'email',
        )

class UserLoginSerializer(serializers.Serializer):

    # Campos que vamos a requerir
    username = serializers.CharField(min_length=1, max_length=64)
    password = serializers.CharField(min_length=1, max_length=64)

    # Primero validamos los datos
    def validate(self, data):

        # authenticate recibe las credenciales, si son válidas devuelve el objeto del usuario
        user = authenticate(username=data['username'], password=data['password'])
        if not user:
            raise serializers.ValidationError('Las credenciales no son válidas')

        # Guardamos el usuario en el contexto para posteriormente en create recuperar el token
        self.context['user'] = user

        return data

    def create(self, data):
        """Generar o recuperar token."""
        token, created = Token.objects.get_or_create(user=self.context['user'])
        return self.context['user'], token.key

class UserSignUpSerializer(serializers.Serializer):

    username = serializers.CharField(
        min_length=1,
        max_length=20,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(min_length=1, max_length=64)
    first_name = serializers.CharField(min_length=0, max_length=50)

    def validate(self, data):
        # passwd = data['password']
        # password_validation.validate_password(passwd)

        return data

    def create(self, data):
        user = User.objects.create_user(**data) #type: ignore
        mathuser = MathUser.objects.create(username=data['username'], formulas="[]")
        mathuser.save()

        return user