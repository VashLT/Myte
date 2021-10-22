from django.contrib import admin
from .models import Image

class ImageAdmin(admin.ModelAdmin):
    list_display = ('id_image', 'date', 'url', 'title')

# Register your models here.

admin.site.register(Image, ImageAdmin)