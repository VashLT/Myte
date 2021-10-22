from rest_framework import serializers
from maths.models import Formula, MathUser

import datetime

class StringListField(serializers.ListField):

    def to_representation(self, data):
        """
        List of object instances -> List of dicts of primitive datatypes.
        """
        try:
            raw_data = data.replace("'", "")[1:-1]
            raw_list = raw_data.split(',')
            if raw_list[0] == '':
                return []

            return [string.strip() for string in raw_list]
        
        except AttributeError:
            return super().to_representation(data)


class FormulaSerializer(serializers.ModelSerializer):
    id_formula = serializers.ReadOnlyField()
    added_at = serializers.ReadOnlyField()
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
            'is_created',
        )

    def create(self, validated_data):
        clss = self.Meta.model
        obj_count = len(clss.objects.all())

        # Check if id is not duplicated
        while clss.objects.filter(id_formula=obj_count):
            obj_count += 1

        # validated_data['title'] = validated_data['title'].upper()
        # validated_data['category'] = validated_data['category'].upper()
        # validated_data['tags'] = [string.upper() for string in validated_data['tags']]

        obj = clss.objects.create(**validated_data, id_formula=obj_count, added_at=datetime.datetime.utcnow())
        obj.save()

        return obj

# class MathUser(models.Model):
#     _id = models.ObjectIdField()
#     username = models.TextField(max_length=200, unique=True)
#     image_url = models.TextField(max_length=200)
#     formulas = models.TextField(max_length=200)

class MathUserSerializer(serializers.ModelSerializer):
    # username = serializers.ReadOnlyField()
    formulas = StringListField()
    class Meta:
        model = MathUser
        fields = (
            'username', 
            'formulas', 
        )

    # def create(self, validated_data):
    #     clss = self.Meta.model
    #     obj_count = len(clss.objects.all())

    #     # Check if id is not duplicated
    #     while clss.objects.get(id_formula=obj_count):
    #         obj_count += 1

    #     validated_data['title'] = validated_data['title'].upper()
    #     validated_data['category'] = validated_data['category'].upper()
    #     validated_data['tags'] = [string.upper() for string in validated_data['tags']]

    #     obj = clss.objects.create(**validated_data, id_formula=obj_count, added_at=datetime.datetime.utcnow())
    #     obj.save()

    #     return obj