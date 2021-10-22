from rest_framework import serializers
from maths.models import Image, Formula

class ImageSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model = Image
        fields = (
            'id', 
            'date', 
            'url', 
            'title',
        )

class FormulaSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model = Formula
        fields = (
            'id', 
            'added_at', 
            'tags', 
            'title',
            'latex_code',
            'images',
            'is_deleted',
        )