from rest_framework import serializers
from maths.models import Image, Formula

class StringListField(serializers.ListField):

    def to_representation(self, data):
        """
        List of object instances -> List of dicts of primitive datatypes.
        """
        raw_data = data.replace("'", "")[1:-1]
        raw_list = raw_data.split(',')
        return [string.strip() for string in raw_list]
        # return [self.child.to_representation(item) if item is not None else None for item in data]
        # return ['pene']

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
    # tags = serializers.ListField()
    tags = StringListField()
    images = StringListField()
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