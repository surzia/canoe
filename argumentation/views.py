from django.shortcuts import render

from argumentation.models import Exam, Reading, Paragraph


def display_all_exams(request):
    exams = Exam.objects.all()
    context = {'exams': exams}
    return render(request, 'argumentation.html', context)


def display_exam(request, exam_id):
    read_id = request.GET.get('read_id')
    if read_id is None:
        read_id = 1
    exam = Exam.objects.get(pk=exam_id)
    read = Reading.objects.get(exam=exam, code=read_id)
    paragraph = Paragraph.objects.filter(reading=read)
    context = {
        'exam': exam,
        'read': read,
        'paragraph': paragraph
    }
    return render(request, 'detail.html', context)
