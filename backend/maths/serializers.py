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
        clss = self.Meta.model
        obj_count = len(clss.objects.all())
        print(obj_count)

        validated_data['title'] = validated_data['title'].upper()

        obj = clss.objects.create(**validated_data, id_image=obj_count)
        obj.save()

        return obj

class FormulaSerializer(serializers.ModelSerializer):
    id_formula = serializers.ReadOnlyField()
    tags = serializers.ListField()
    images = serializers.ListField()
    class Meta:
        model = Formula
        fields = (
            # '_id',
            'id_formula', 
            'added_at', 
            'tags',
            'category', 
            'title',
            'latex_code',
            'images',
            'is_deleted',
        )

    def create(self, validated_data):
        clss = self.Meta.model
        obj_count = len(clss.objects.all())
        print(obj_count)

        obj = clss.objects.create(**validated_data, id_formula=obj_count)
        obj.save()

        return obj