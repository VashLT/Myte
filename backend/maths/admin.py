from django.contrib import admin
from .models import Image

class ImageAdmin(admin.ModelAdmin):
    list_display = ('id_image', 'added_at', 'url', 'title')

# Register your models here.

admin.site.register(Image, ImageAdmin)