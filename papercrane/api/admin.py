from django.contrib import admin
from api.models import Post


class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'content', 'created', 'updated']
    ordering = ['updated']


admin.site.register(Post, PostAdmin)
