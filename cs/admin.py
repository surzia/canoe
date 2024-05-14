from django.contrib import admin

from cs.models import Questions


@admin.register(Questions)
class QuestionsAdmin(admin.ModelAdmin):
    list_display = ('text', 'options', 'category', 'kind', 'answer')
