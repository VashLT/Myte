from rest_framework import serializers
from maths.models import Image, Formula

class ImageSerializer(serializers.ModelSerializer):
    id_image = serializers.ReadOnlyField()
    class Meta:
        model = Image
        fields = (
            # '_id',
            'id_image', 
            'date', 
            'url', 
            'title',
        )
    def create(self, validated_data):
        obj_count = len(Image.objects.all())
        print(obj_count)

        return super().create(validated_data)

class FormulaSerializer(serializers.ModelSerializer):
    id_formula = serializers.ReadOnlyField()
    class Meta:
        model = Formula
        fields = (
            # '_id',
            'id_formula', 
            'added_at', 
            'tags', 
            'title',
            'latex_code',
            'images',
            'is_deleted',
        )

    def create(self, validated_data):
        obj_count = len(Formula.objects.all())
        print(obj_count)

        return super().create(validated_data)