from django.contrib import admin

from argumentation.models import Answer, Exam, Reading, Paragraph


@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    list_display = ('name', 'year')


@admin.register(Reading)
class ReadingAdmin(admin.ModelAdmin):
    list_display = ('exam', 'question_no', 'question', 'question_score')

    @staticmethod
    def question_no(obj):
        return '材料{}'.format(obj.code)

    @staticmethod
    def question_score(obj):
        return '{}分'.format(obj.score)


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    pass


@admin.register(Paragraph)
class ParagraphAdmin(admin.ModelAdmin):
    list_display = ('reading', 'paragraph_no')

    @staticmethod
    def paragraph_no(obj):
        return '第{}段'.format(obj.no)
