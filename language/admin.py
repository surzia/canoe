from django.contrib import admin

from language.models import Language, Usage


@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    search_fields = ['word']
    list_display = ('word', 'expression')


@admin.register(Usage)
class UsageAdmin(admin.ModelAdmin):
    pass
