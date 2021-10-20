from django.shortcuts import render
from django.views import View
from django.http import HttpResponse, JsonResponse
from maths import models

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
