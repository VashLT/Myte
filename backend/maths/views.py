from django.core.exceptions import ValidationError
from django.views import View
from django.http import JsonResponse

from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status, viewsets
from .serializers import FormulaSerializer, MathUserSerializer
from .models import Formula, MathUser

import json

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
        tags = formula.tags

        math_user_tags = set()
        if math_user.tags:
            math_user_tags.update(json.loads(math_user.tags.replace("'", "\"")))

        math_user_tags.update(tags)
        
        math_user.tags = str(list(math_user_tags))

        if math_user.formulas == "[]":
            math_user.formulas = f'[{formula.id_formula}]'
        
        else:
            math_user.formulas = f'{math_user.formulas[:-1]}, {formula.id_formula}]'
        
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

class TagsView(View):

    def get(self, request):
        result = MathUser.objects.filter(username=request.user.username)
        if not result:
            return JsonResponse({'error': 'user not found'}, status=status.HTTP_403_FORBIDDEN)
        
        user_tags = []
        for math_user in result:
            if math_user.tags:
                user_tags = json.loads(math_user.tags.replace("'", "\""))  

        total_tags = set(user_tags)
        result = Formula.objects.filter(is_created__in=[False])
        for formula in result:
            formula_tags = json.loads(formula.tags.replace("'", "\""))
            total_tags.update(formula_tags)
        
        normalized_tags = [string.lower() for string in total_tags]

        data = {
            'tags': normalized_tags
        }

        return JsonResponse(data, status=status.HTTP_200_OK)