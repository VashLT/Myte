from django.shortcuts import render
from django.views import View
from django.http import HttpResponse, JsonResponse
from maths import models

from rest_framework import viewsets
from .serializers import ImageSerializer
from .models import Image

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
    serializer_class = ImageSerializer
    lookup_field = 'id_image'
    queryset = Image.objects.all()